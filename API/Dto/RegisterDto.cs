using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class RegisterDto
    {
        public string Name { get; set; } = null!;
        [Required] public string UserName { get; set; } = null!;
        [Required] public string Email { get; set; } = null!;
        [Required] public string Password { get; set; } = null!;

        [Required]
        [Compare(nameof(Password), ErrorMessage = "Password fields must match")]
        public string CheckPassword { get; set; } = null!;
    }
}