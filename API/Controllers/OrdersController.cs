using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Context;
using API.Dto;
using API.Entity;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController(AppDbContext context) : ControllerBase
    {
        [HttpGet("GetOrders")]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDto()
                        .Where(i => i.CustomerId == User.Identity!.Name)
                        .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id)
        {
            return await context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDto()
                        .Where(i => i.CustomerId == User.Identity!.Name && i.Id == id)
                        .FirstOrDefaultAsync();
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var cart = await context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(p => p.CustomerId == User.Identity!.Name);

            if (cart is null)
                return BadRequest(new ProblemDetails { Title = "cart is null" });

            var items = new List<OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await context.Products.FindAsync(item.ProductId);

                var orderItem = new OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFee = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = orderDto.FirstName,
                LastName = orderDto.LastName,
                Phone = orderDto.Phone,
                City = orderDto.City,
                AddresLine = orderDto.AddresLine,
                SubTotal = subTotal,
                DeliveryFee = deliveryFee
            };

            context.Orders.Add(order);
            context.Carts.Remove(cart);

            var result = await context.SaveChangesAsync() > 0;
            return result ?
             CreatedAtRoute(nameof(GetOrder), new { id = order.Id }, order.Id) :
             BadRequest(new ProblemDetails { Title = "Problem getting order" });
        }
    }
}