using System.Collections.Generic;
using LeagueAppApi.Models;

namespace LeagueAppApi.Services
{
    public interface IAuthenticationService
    {
        User Authenticate(string username, string password);
        User GetById(int id);
        User Create(User user, string password);
    }
}