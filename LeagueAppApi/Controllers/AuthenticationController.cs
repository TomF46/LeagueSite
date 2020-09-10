using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using LeagueAppApi.Models;
using LeagueAppApi.Services;
using LeagueAppApi;

namespace WebApi.Controllers
{
    /// <summary>Class <c>AuthenticationController</c> API controller for commands related to Authentication e.g.null Logging in and out</summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticationService _authenticationService;
        private readonly AppSettings _appSettings;

        public AuthenticationController(
            IAuthenticationService authenticationService,
            IOptions<AppSettings> appSettings)
        {
            _authenticationService = authenticationService;
            _appSettings = appSettings.Value;
        }

        /// <summary>Takes user login details and returns Authentication response including bearer token if valid, else return error</summary>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserLoginDto userLoginDto)
        {
            var user = _authenticationService.Authenticate(userLoginDto.Username, userLoginDto.Password);

            if (user == null)
                return BadRequest("Username or password is incorrect");

            var tokenExpiryTime = DateTime.UtcNow.AddDays(365);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = tokenExpiryTime,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new AuthenticationResponse()
            {
                Id = user.Id,
                Username = user.Username,
                Token = tokenString,
                TokenExpiry = tokenExpiryTime
            });
        }

        /// <summary>Takes user registration details and return 200 response if valid, else return error message</summary>
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegistrationDto userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
            };

            try
            {
                _authenticationService.Create(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}