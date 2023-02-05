using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using my_photofolio_for_vue_backend.Configurations;
using my_photofolio_for_vue_backend.Data;
using my_photofolio_for_vue_backend.Models;
using System.CodeDom.Compiler;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace my_photofolio_for_vue_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private readonly ApplicationDbContext _db;
        //private readonly IConfiguration _config;

        //public UsersController(ApplicationDbContext db, IConfiguration config)
        //{
        //    _db = db;
        //    _config = config;
        //}

        //[Route("Login")]
        //[AllowAnonymous, HttpPost]
        //public IActionResult Post ([FromBody] UserLogin userLogin)
        //{
        //    if(ModelState.IsValid)
        //    {
        //        UserModel? user = _db.userModels.FirstOrDefault(el => el.Email == userLogin.Email && el.Password == userLogin.Password);
        //        if (user == null)
        //        {
        //            return BadRequest(new AuthResult()
        //            {
        //                Result = false,
        //                Errors= new List<string>()
        //                {
        //                    "Email already exist"
        //                }
        //            });
        //        }
        //        var token = GenerateToken(user);
        //        return Ok(new AuthResult()
        //        {
        //            Result = true,
        //            Token = token,
        //        });
        //    }
        //    return NotFound("Not Found Login and Password");
        //} 

        //private string GenerateToken(UserModel userM)
        //{
        //    var JwtTokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value);

        //    var tokenDescriptor = new SecurityTokenDescriptor()
        //    {
        //        Subject = new ClaimsIdentity(new[] 
        //        {
        //            new Claim("Id", userM.Id.ToString()),
        //            new Claim(JwtRegisteredClaimNames.Sub, userM.Email),
        //            new Claim(JwtRegisteredClaimNames.Email, value:userM.Email),
        //            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //            new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString()),
        //        }),

        //        Expires = DateTime.Now.AddHours(1),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
        //    };

        //    var token = JwtTokenHandler.CreateToken(tokenDescriptor);

        //    return JwtTokenHandler.WriteToken(token);
        //}

        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _config;

        public UsersController(ApplicationDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [Route("Login")]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post([FromBody] UserLogin userLogin)
        {
            UserModel? user = Authenticate(userLogin);
            if (user != null)
            {
                var token = Generate(user);
                var response = new
                {
                    userToken = token,
                    //StatusCode= 200,
                    userName = user.Email,
                };
                return Ok(response);
            }

            return NotFound("Not Found Login and Password");
        }

        [Route("Register")]
        [AllowAnonymous, HttpPost]
        public IActionResult Post([FromBody] UserModel user)
        {
            try
            {
                _db.userModels.Add(user);
                _db.SaveChanges();
                var token = Generate(user);
                var response = new
                {
                    userToken = token,
                    //StatusCode= 200,
                    userName = user.Email,
                };
                return Ok(response);
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }

        private object Generate(UserModel user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentails = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.FirstName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.LastName),
                new Claim(ClaimTypes.Role, user.RoleUser)
            };
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentails
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel? Authenticate(UserLogin userLogin)
        {
            UserModel? user = _db.userModels.FirstOrDefault(el => el.Email == userLogin.Email && el.Password == userLogin.Password);

            if (user == null)
            {
                return null;
            }
            else
            {
                return user;
            }
        }
    }
}
