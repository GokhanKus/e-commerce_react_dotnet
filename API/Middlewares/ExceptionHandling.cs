using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middlewares
{
    public class ExceptionHandling(RequestDelegate _next, ILogger<ExceptionHandling> _logger, IHostEnvironment _env)
    {
        //bu custom olarak yazdigimiz middleware'in amaci app'imiz development asamasındaysa detaylı olarak exception mesajlarini gosterir
        //ama app'imiz production asamasina gectiginde sadece 500 hata koduyla server error bilgisini aliriz
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = HttpStatusCode.InternalServerError.GetHashCode();

                var response = new ProblemDetails
                {
                    Status = HttpStatusCode.InternalServerError.GetHashCode(),
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title = ex.Message
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var errorMessage = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(errorMessage);
            }
        }
    }
}