using NUnit.Framework;
using LeagueApp.Api.Models;
using LeagueApp.Api.Services;
using LeagueApp.Tests;
using System;
using LeagueApp.Api;

namespace Tests
{
    [TestFixture]
    public class AuthenticationServiceTests
    {

        private readonly LeagueAppContext _context;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDbContext();
            _authenticationService = new AuthenticationService(_context);
        }

        [SetUp]
        public void SetUp()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();
        }

        [Test]
        public void UserCanRegister()
        {
            var user = new User
            {
                Id = 1,
                Username = "TestUser1"
            };

            _authenticationService.Create(user, "Password1");

            var userFromDb = _authenticationService.GetById(1);

            Assert.AreEqual(user.Username, userFromDb.Username);
        }

        [Test]
        public void UserCanRegisterThenLoginSuccesfully()
        {
            var user = new User
            {
                Id = 1,
                Username = "TestUser2"
            };

            _authenticationService.Create(user, "Password1");

            var authenticatedUser = _authenticationService.Authenticate("TestUser2", "Password1");

            Assert.IsNotNull(authenticatedUser);

        }

        [Test]
        public void UserRegisteringWithAnExistingUsernameReturnsException()
        {
            var user = new User
            {
                Id = 1,
                Username = "TestUser1"
            };

            _authenticationService.Create(user, "Password1");

            var user2 = new User
            {
                Id = 2,
                Username = "TestUser1"
            };

            Assert.Throws<AppException>(() => _authenticationService.Create(user2, "Password2"));
        }

        [Test]
        public void UserRegisteringWithoutAPasswordReturnsException()
        {
            var user = new User
            {
                Id = 1,
                Username = "TestUser1"
            };

            Assert.Throws<AppException>(() => _authenticationService.Create(user, ""));
        }

        [Test]
        public void UserRegisteringWithoutAUsernameReturnsException()
        {
            var user = new User
            {
                Id = 1,
                Username = ""
            };

            Assert.Throws<AppException>(() => _authenticationService.Create(user, "Password1"));
        }

        [Test]
        public void UserCanNotAuthenticateWithIncorrectPassword()
        {
            var user = new User
            {
                Id = 1,
                Username = "TestUser3"
            };

            _authenticationService.Create(user, "Password3");

            var authenticatedUser = _authenticationService.Authenticate("TestUser3", "Password1");

            Assert.IsNull(authenticatedUser);
        }


        [Test]
        public void CanGetUser()
        {
            var user = new User
            {
                Id = 1,
                Username = "Test1User",
                PasswordHash = null,
                PasswordSalt = null
            };

            _context.Users.Add(user);

            var fromDb = _authenticationService.GetById(1);

            Assert.AreEqual(fromDb.Username, "Test1User");
        }
    }
}