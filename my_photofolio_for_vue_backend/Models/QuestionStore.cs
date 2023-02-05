using System.ComponentModel.DataAnnotations;

namespace my_photofolio_for_vue_backend.Models
{
    public class QuestionStore
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public string UserLogin { get; set; }
        [Required]
        public string BinCod { get; set; }
        [Required]
        public DateTime TheTime { get; set; }
    }
}
