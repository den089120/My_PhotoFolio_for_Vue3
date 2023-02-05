using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using my_photofolio_for_vue_backend.Data;
using my_photofolio_for_vue_backend.Models;

namespace my_photofolio_for_vue_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HexagramController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public HexagramController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<Hexagram> Get()
        {
            IEnumerable<Hexagram> objList = _db.Hexagrams;
            return objList.ToArray();
        }
    }
}
