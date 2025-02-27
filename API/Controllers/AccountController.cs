using API.Dto;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserManager<AppUser> _userManager) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return BadRequest(new { message = "email not found" });

            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            return result ?
            Ok(new { token = "token" }) :
            Unauthorized();
        }
    }
}