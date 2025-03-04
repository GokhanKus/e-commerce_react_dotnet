using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> OrderToDto(this IQueryable<Order> query)
        {
            var orderDto = query.Select(o => new OrderDto
            {
                Id = o.Id,
                CustomerId = o.CustomerId,
                AddresLine = o.AddresLine,
                City = o.City,
                DeliveryFree = o.DeliveryFree,
                FirstName = o.FirstName,
                LastName = o.LastName,
                OrderDate = o.OrderDate,
                OrderStatus = o.OrderStatus,
                SubTotal = o.SubTotal,
                Phone = o.Phone,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    ProductName = oi.ProductName,
                    ProductId = oi.ProductId,
                    ProductImage = oi.ProductImage,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToList()
            });
            return orderDto;
        }
    }
}