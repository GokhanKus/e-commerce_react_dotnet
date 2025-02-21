using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Context;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController(AppDbContext context) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            var cart = await GetOrCreate();
            return cart;
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            var product = await context.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if (product == null)
                return NotFound("product could not found");

            cart.AddItem(product, quantity);

            return await context.SaveChangesAsync() > 0 ?
            CreatedAtAction(nameof(GetCart), cart) :
            BadRequest(new ProblemDetails { Title = "the product can not be added to the cart" });
        }

        private async Task<Cart> GetOrCreate()
        {
            var cart = await context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);

            if (cart is null)
            {
                var customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true
                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
                cart = new Cart { CustomerId = customerId };
                context.Carts.Add(cart);
                await context.SaveChangesAsync();
            }
            return cart;
        }
    }
}