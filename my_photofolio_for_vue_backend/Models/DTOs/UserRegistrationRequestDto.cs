using System.ComponentModel.DataAnnotations;

namespace my_photofolio_for_vue_backend.Models.DTOs
{
    public class UserRegistrationRequestDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
