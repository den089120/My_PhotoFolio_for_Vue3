using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace my_photofolio_for_vue_backend.Models
{
    public class MovementItem
    {
        [Key]
        public int Id { get; set; }
        public int MovementId { get; set; }
        public int ProductId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Count { get; set; }


        [ForeignKey("MovementId")]
        public virtual Movement Movement { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}
