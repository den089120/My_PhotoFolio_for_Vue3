using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using my_photofolio_for_vue_backend.Models;
using System.Collections.Generic;

namespace my_photofolio_for_vue_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MyModelController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<MyModel> Get()
        {
            return new List<MyModel>()
            {
                new MyModel() 
                {
                    Id = 1,
                    Name = "My",
                    Discription = "Core for my note",
                },
                new MyModel()
                {
                    Id = 2,
                    Name = "his",
                    Discription = "Core for my note",
                },
                new MyModel()
                {
                    Id = 3,
                    Name = "shees",
                    Discription = "Core for my note",
                },
                new MyModel()
                {
                    Id = 4,
                    Name = "then",
                    Discription = "Core for my note",
                },
            }.ToArray();
        }
    }
}
