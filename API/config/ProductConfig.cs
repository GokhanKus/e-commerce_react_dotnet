using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.config
{
    public class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            var products = new List<Product>
                {
                    new Product
                    {
                        Id = 1,
                        Name = "Smartphone",
                        Description = "Latest model smartphone with 128GB storage.",
                        isActive = true,
                        Price = 499.99m,
                        Stock = 500,
                        ImageUrl = "smartphone.jpg"
                    },
                    new Product
                    {
                        Id = 2,
                        Name = "Laptop",
                        Description = "High-performance laptop for gaming and development.",
                        isActive = true,
                        Price = 1200.50m,
                        Stock = 150,
                        ImageUrl = "laptop.jpg"
                    },
                    new Product
                    {
                        Id = 3,
                        Name = "Wireless Earbuds",
                        Description = "Noise-canceling wireless earbuds with long battery life.",
                        isActive = true,
                        Price = 99.99m,
                        Stock = 2000,
                        ImageUrl = "wireless_earbuds.jpg"
                    },
                    new Product
                    {
                        Id = 4,
                        Name = "Smart Watch",
                        Description = "Stylish smart watch with fitness tracking features.",
                        isActive = true,
                        Price = 199.99m,
                        Stock = 850,
                        ImageUrl = "smart_watch.jpg"
                    },
                    new Product
                    {
                        Id = 5,
                        Name = "Gaming Chair",
                        Description = "Ergonomic gaming chair for long hours of comfort.",
                        isActive = false,
                        Price = 299.99m,
                        Stock = 120,
                        ImageUrl = "gaming_chair.jpg"
                    },
                    new Product
                    {
                        Id = 6,
                        Name = "Bluetooth Speaker",
                        Description = "Portable bluetooth speaker with great sound quality.",
                        isActive = true,
                        Price = 59.99m,
                        Stock = 1500,
                        ImageUrl = "bluetooth_speaker.jpg"
                    }
                };
            builder.HasData(products);
        }
    }
}