using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Context;
using API.Dto;
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
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await GetOrCreate();
            return CartToDto(cart);
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
            CreatedAtAction(nameof(GetCart), CartToDto(cart)) :
            BadRequest(new ProblemDetails { Title = "the product can not be added to the cart" });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            cart.DeleteItem(productId, quantity);

            return await context.SaveChangesAsync() > 0 ?
            CreatedAtAction(nameof(GetCart), CartToDto(cart)) :
            BadRequest(new ProblemDetails { Title = "no such as product found" });
        }

        //normalde controllerda private metot falan olmaz ya da controllerda dbcontext kullanılmaz etc.. controller'ın gorevi gelen http verb'lerini karsılamaktır ama bu projenin amacı backendi react'la birlikte kullanmak oldugu icin best practiceler göz ardı edilmistir, bu projenin amaci react training oldugu icin bu kötü senaryolari dikkate almayalim
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
        private CartDto CartToDto(Cart cart)
        {
            var cartDto = new CartDto
            {
                CartId = cart.Id,
                CustomerId = cart.CustomerId,
                CartItems = cart.CartItems.Select(ci => new CartItemDto
                {
                    ProductId = ci.ProductId,
                    Name = ci.Product.Name,
                    Quantity = ci.Quantity,
                    Price = ci.Product.Price,
                    ImageUrl = ci.Product.ImageUrl
                }).ToList()
            };

            return cartDto;
        }
    }
}