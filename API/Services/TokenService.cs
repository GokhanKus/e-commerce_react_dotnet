using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService(UserManager<AppUser> _userManager, IConfiguration _config)
    {
        public async Task<string> GenerateToken(AppUser user)
        {
            //claim: token icerisine gomecegimiz bilgilerdir
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Email,user.Email!),
                new Claim(ClaimTypes.NameIdentifier,user.Id!),
                new Claim(ClaimTypes.Name,user.UserName!),
            };
            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWTSecurity:SecretKey"]!));

            var tokenSettings = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                Issuer = "gokhankus.example.com", //uretici firma
                Audience = "firm.example.com" //hangi firma icin uretildi..
            };

            var token = tokenHandler.CreateToken(tokenSettings);
            return tokenHandler.WriteToken(token);
        }
    }
}