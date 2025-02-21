using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Cart
    {
        public int Id { get; set; }
        public string CustomerId { get; set; } = null!;
        public List<CartItem> CartItems { get; set; } = new();
        public void AddItem(Product product, int quantity)
        {
            var item = CartItems.Where(ci => ci.ProductId == product.Id).FirstOrDefault();

            if (item is null)
            {
                var cartItem = new CartItem { Product = product, Quantity = quantity };
                CartItems.Add(cartItem);
            }
            else item.Quantity += quantity;
        }
        public void DeleteItem(int productId, int quantity)
        {
            var item = CartItems.Where(ci => ci.ProductId == productId).FirstOrDefault();

            if (item is null) return;

            item.Quantity -= quantity;

            if (item.Quantity <= 0) CartItems.Remove(item);
        }
    }
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int Quantity { get; set; } //aynı urunden kac tane eklenmis?

        public int CartId { get; set; }

        [JsonIgnore]
        public Cart Cart { get; set; } = null!;
    }
}