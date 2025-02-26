using API.config;
using API.Context;
using API.Entity;
using API.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("SqliteString");
    options.UseSqlite(connectionString);
});

builder.Services.AddCors();
builder.Services.AddIdentity<AppUser, AppRole>().AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseMiddleware<ExceptionHandling>();

if (app.Environment.IsDevelopment())
{
    SeedDataBase.Initialize(app);
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "demo api");
    });
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseCors(opt =>
{
    //front end tarafında request atarken has been blocked by cors hatası alıyorduk lclhost 3000 adresinden(react front end) gelen isteklere izin verelim 
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
    //frontend tarafında sepete urun eklerken customerId alınmıyordu her eklendiginde sanki farklı bir customerId ekliyormus gibi oluyordu 
    //o yuzden cookie token gibi ogelerin cross origin isteklerinde de tasınmasını saglamak icin AllowCredentials() kullandık
});

app.UseAuthorization();

app.MapControllers();

app.Run();
