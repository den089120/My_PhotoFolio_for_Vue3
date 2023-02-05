using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using my_photofolio_for_vue_backend.Data;
using my_photofolio_for_vue_backend.Models;

namespace my_photofolio_for_vue_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public QuestionController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<QuestionStore> Get()
        {
            IEnumerable<QuestionStore> QesList = _db.questionStores;
            return QesList.ToArray();
        }
    }
}
