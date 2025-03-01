using API.Dto;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserManager<AppUser> _userManager, TokenService _tokenService) : ControllerBase
    {

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return BadRequest(new ProblemDetails { Title = "email not found" });

            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            return result ?
            Ok(new UserDto { Token = await _tokenService.GenerateToken(user), Name = user.Name! }) :
            Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new AppUser
            {
                Name = model.Name,
                Email = model.Email,
                UserName = model.UserName
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "Customer");
            return Created();
        }
        [Authorize]
        [HttpGet("getuser")]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            //browser icerisnde login yaptiktan sonra sayfayi refreshleyince redux icerisindeki user bilgisi kayboluyor cookie ve local storage icerisinde kaybolmuyor
            //bu token ve name bilgisini tekrar state uzerine aktarmak icin bu metot yazildi
            var user = await _userManager.FindByNameAsync(User.Identity?.Name!);

            if (user is null)
                return BadRequest(new ProblemDetails { Title = "username not found" });

            return new UserDto
            {
                Token = await _tokenService.GenerateToken(user),
                Name = user.Name!
            };
        }
    }
}