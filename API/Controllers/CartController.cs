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
            var cart = await context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);


            if (cart is null)
                return NotFound();

            return cart;
        }
    }
}