using API.Context;
using API.Dto;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserManager<AppUser> _userManager, TokenService _tokenService, AppDbContext context) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                return BadRequest(new ProblemDetails { Title = "email not found" });

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!result)
                return Unauthorized();

            var userCart = await GetOrCreate(model.Email);
            var cookieCart = await GetOrCreate(Request.Cookies["customerId"]!);

            if (userCart != null)
            {
                foreach (var item in cookieCart.CartItems)
                {
                    userCart.AddItem(item.Product, item.Quantity);
                }

                context.Carts.Remove(cookieCart);
            }

            userCart.CustomerId = model.Email;
            await context.SaveChangesAsync();

            return Ok(new UserDto
            {
                Token = await _tokenService.GenerateToken(user),
                Name = user.Name!,
                UserName = user.UserName!
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string userName = GenerateUserName(model);

            var user = new AppUser
            {
                Name = model.Name ?? "",
                Email = model.Email,
                UserName = userName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await _userManager.AddToRoleAsync(user, "Customer");
            return Created();
        }

        private static string GenerateUserName(RegisterDto model)
        {
            var userNameBase = model.Email.Split('@')[0]; // @ işaretinden önceki kısmı al
            var randomSuffix = Guid.NewGuid().ToString("N")[..8]; // 8 karakterlik rastgele bir değer
            var userName = model.UserName ?? $"{userNameBase}{randomSuffix}";
            return userName;
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

        private async Task<Cart> GetOrCreate(string custId)
        {
            var cart = await context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == custId);

            if (cart is null)
            {
                var customerId = User.Identity?.Name;

                if (string.IsNullOrEmpty(customerId))
                {
                    customerId = Guid.NewGuid().ToString();
                    var cookieOptions = new CookieOptions
                    {
                        Expires = DateTime.Now.AddMonths(1),
                        IsEssential = true
                    };
                    Response.Cookies.Append("customerId", customerId, cookieOptions);
                }

                cart = new Cart { CustomerId = customerId };
                context.Carts.Add(cart);
                await context.SaveChangesAsync();
            }
            return cart;
        }
    }
}