using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class CartDto
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;
        public List<CartItemDto> CartItems { get; set; } = new();

    }
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public int Quantity { get; set; } //aynı urunden kac tane eklenmis?
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
    }
}