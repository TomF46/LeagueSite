using System;

namespace LeagueAppApi.Models
{

    public class AuthenticationResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime TokenExpiry { get; set; }
    }
}