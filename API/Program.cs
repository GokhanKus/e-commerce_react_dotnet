using API.Context;
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

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseMiddleware<ExceptionHandling>();

if (app.Environment.IsDevelopment())
{
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
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

app.Run();
