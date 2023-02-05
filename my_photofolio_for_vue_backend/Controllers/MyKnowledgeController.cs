using Microsoft.AspNetCore.Mvc;
using my_photofolio_for_vue_backend.Data;
using my_photofolio_for_vue_backend.Models;

namespace my_photofolio_for_vue_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MyKnowledgeController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public MyKnowledgeController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<MyKnowledge> Get()
        {
            IEnumerable<MyKnowledge> list = _db.myKnowledges.ToList();
            return list;
        }
        [HttpPost]
        public bool Post(MyKnowledge newKnowledge)
        {
            MyKnowledge Knowledge = new MyKnowledge();
            Knowledge.Description = newKnowledge.Description;
            Knowledge.PathImage = newKnowledge.PathImage;

            _db.myKnowledges.Add(Knowledge);
            _db.SaveChanges();

            return true;
        }
    }
}
