using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace my_photofolio_for_vue_backend.Models
{
    public class Movement
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public int? WarehouseSourceId { get; set; }
        public int? WarehouseDestinationId { get; set; }
    }
}
