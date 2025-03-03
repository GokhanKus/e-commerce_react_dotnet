using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Context;
using API.Dto;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
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
            var cart = await GetOrCreate(GetCustomerId());
            return CartToDto(cart);
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate(GetCustomerId());
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
            var cart = await GetOrCreate(GetCustomerId());
            cart.DeleteItem(productId, quantity);

            return await context.SaveChangesAsync() > 0 ?
            CreatedAtAction(nameof(GetCart), CartToDto(cart)) :
            BadRequest(new ProblemDetails { Title = "no such as product found" });
        }

        private string GetCustomerId() => User.Identity?.Name ?? Request.Cookies["customerId"]!;

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