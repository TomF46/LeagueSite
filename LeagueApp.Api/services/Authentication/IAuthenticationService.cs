using System.Collections.Generic;
using LeagueApp.Api.Models;

namespace LeagueApp.Api.Services
{
    public interface IAuthenticationService
    {
        User Authenticate(string username, string password);
        User GetById(int id);
        User Create(User user, string password);
    }
}