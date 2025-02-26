using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.AspNetCore.Identity;

namespace API.config
{
    public static class SeedDataBase
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            var userManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

            if (!roleManager.Roles.Any()) //herhangi bir rol kaydi yoksa rol olusturalim
            {
                var customer = new AppRole { Name = "Customer" };
                var admin = new AppRole { Name = "Admin" };
                await roleManager.CreateAsync(customer);
                await roleManager.CreateAsync(admin);
            }
            if (!userManager.Users.Any()) //user kaydi yoksa user olusturalim
            {
                var customer = new AppUser { Name = "Deniz", UserName = "deniz123", Email = "deniz@info.com" };
                var admin = new AppUser { Name = "Gokhan", UserName = "gokhankus1998", Email = "gokhankus1998@gmail.com" };

                await userManager.CreateAsync(customer, "Customer_123");
                await userManager.AddToRoleAsync(customer, "Customer");

                await userManager.CreateAsync(admin, "Admin_123");
                await userManager.AddToRolesAsync(admin, ["Admin", "Customer"]);
            }

        }
    }
}