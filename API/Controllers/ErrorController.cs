using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/error")]
    public class ErrorController : ControllerBase
    {
        [HttpGet("not-found")]
        public IActionResult NotFound()
        {
            return base.NotFound();
        }
        [HttpGet("bad-request")]
        public IActionResult BadRequest()
        {
            return base.BadRequest();
        }
        [HttpGet("unauthorized")]
        public IActionResult UnAuthorized()
        {
            return Unauthorized();
        }
        [HttpGet("server-error")]
        public IActionResult ServerError()
        {
            throw new Exception("server error");
        }
        [HttpGet("validation-error")]
        public IActionResult ValidationError()
        {
            ModelState.AddModelError("validation error 1", "validation error details");
            ModelState.AddModelError("validation error 2", "validation error details");
            return ValidationProblem();
        }
    }
}