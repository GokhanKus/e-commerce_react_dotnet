using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    isActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Stock = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "Name", "Price", "Stock", "isActive" },
                values: new object[,]
                {
                    { 1, "Apple Watch Series", "1.jpg", "Apple Watch Series 1", 70000m, 100, true },
                    { 2, "Telefon açıklaması", "2.jpg", "Apple Watch Series 2", 80000m, 100, true },
                    { 3, "Telefon açıklaması", "3.jpg", "Apple Watch Series 3", 90000m, 100, false },
                    { 4, "Telefon açıklaması", "4.jpg", "Xiaomi Redmi Watch 1", 100000m, 100, true },
                    { 5, "Telefon açıklaması", "5.jpg", "Xiaomi Redmi Watch 2", 100000m, 100, true },
                    { 6, "Telefon açıklaması", "6.jpg", "Xiaomi Redmi Watch 3", 100000m, 100, true },
                    { 7, "Telefon açıklaması", "7.jpg", "Xiaomi Redmi Watch 4", 100000m, 100, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
