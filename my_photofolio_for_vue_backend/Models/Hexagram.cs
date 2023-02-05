using System.ComponentModel.DataAnnotations;

namespace my_photofolio_for_vue_backend.Models
{
    public class Hexagram
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string BinaryCod { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
