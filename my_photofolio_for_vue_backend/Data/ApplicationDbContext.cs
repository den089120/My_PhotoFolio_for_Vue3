using Microsoft.EntityFrameworkCore;
using my_photofolio_for_vue_backend.Models;

namespace my_photofolio_for_vue_backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {

        }
        public DbSet<Hexagram> Hexagrams { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Warehouse> Warehouse { get; set; }
        public DbSet<Movement> Movements { get; set; }
        public DbSet<MovementItem> MovementsItem { get; set; }
        public DbSet<QuestionStore> questionStores { get; set; }
        public DbSet<SelectHexaStore> selectHexaStores { get; set; }
        public DbSet<MyKnowledge> myKnowledges { get; set; }
        public DbSet<UserModel> userModels { get; set; }
    }
}
