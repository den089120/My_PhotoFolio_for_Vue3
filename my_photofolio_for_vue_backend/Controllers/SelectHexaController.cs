//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using my_photofolio_for_vue_backend.Data;
using my_photofolio_for_vue_backend.Models;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Web.Http;

namespace my_photofolio_for_vue_backend.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    [ApiController]
    public class SelectHexaController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public SelectHexaController(ApplicationDbContext db)
        {
            _db = db;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles ="Administrator,User")]
        public IEnumerable<SelectHexaStore> Get()
        {

            //var currentUser = UserName;
            //var UserBody = HttpContext;
            //var identity = (Cli)HttpContext.User.Identity as ClaimsIdentity;
            var identity = GetCurrentUser();

            if (identity != null)
            {
                IEnumerable<SelectHexaStore> SelList = _db.selectHexaStores.OrderBy(el=>el.UserLogin == identity.Email);
                return SelList.ToArray();
            }
            
            return Enumerable.Empty<SelectHexaStore>();
            
        }

        private UserModel? GetCurrentUser()
        {
            //var identity = accessorMy.HttpContext.User.Identity as ClaimsIdentity;
            var identity = (ClaimsIdentity?)HttpContext.User.Identity;
            //var toc = token.OutboundClaimTypeMap.FirstOrDefault(e => e.Key == "emailaddress");
            //var toc1 = http.HttpContext.User.Claims.FirstOrDefault();

            if (identity != null) 
            {
                var userClaims = identity.Claims;
                //return userClaims;
                return new UserModel
                {
                    FirstName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    LastName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    RoleUser = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                };
            }
            return null;
        }

        public class UserName
        {
            public string Name { get; set; }
        }
    }
}
