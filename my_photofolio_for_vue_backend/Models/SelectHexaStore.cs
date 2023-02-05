using System.ComponentModel.DataAnnotations;

namespace my_photofolio_for_vue_backend.Models
{
    public class SelectHexaStore
    {
        [Key]
        public int Id { get; set; }
        public string UserLogin { get; set; }
        public string Bincod { get; set; }
        public DateTime TheTime { get; set; }
    }
}
