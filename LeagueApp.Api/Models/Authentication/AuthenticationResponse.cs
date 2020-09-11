using System;

namespace LeagueApp.Api.Models
{

    public class AuthenticationResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime TokenExpiry { get; set; }
    }
}