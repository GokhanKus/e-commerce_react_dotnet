using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ProductSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "Name", "Price", "Stock", "isActive" },
                values: new object[,]
                {
                    { 1, "Latest model smartphone with 128GB storage.", "smartphone.jpg", "Smartphone", 499.99m, 500, true },
                    { 2, "High-performance laptop for gaming and development.", "laptop.jpg", "Laptop", 1200.50m, 150, true },
                    { 3, "Noise-canceling wireless earbuds with long battery life.", "wireless_earbuds.jpg", "Wireless Earbuds", 99.99m, 2000, true },
                    { 4, "Stylish smart watch with fitness tracking features.", "smart_watch.jpg", "Smart Watch", 199.99m, 850, true },
                    { 5, "Ergonomic gaming chair for long hours of comfort.", "gaming_chair.jpg", "Gaming Chair", 299.99m, 120, false },
                    { 6, "Portable bluetooth speaker with great sound quality.", "bluetooth_speaker.jpg", "Bluetooth Speaker", 59.99m, 1500, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
