using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
           var user=await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

           if(user==null)
           return null;

           if(!VerifyPassworrdHash(password,user.PasswordHash,user.PasswordSalt))
           return null;

           return user;
        }

        private bool VerifyPassworrdHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedPassword=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));


                for(int i=0;i<computedPassword.Length;i++)
                {
                    if(computedPassword[i]!=passwordHash[i])
                    return false;
                }
                return true;
            }
        }

        public async Task<User>  Register(User user, string password)
        {
            byte[] passwordHash,passwordSalt;

            CreatePasswordHash(password,out passwordHash,out passwordSalt);   

            user.PasswordHash=passwordHash;
            user.PasswordSalt=passwordSalt;

            await _context.Users.AddAsync(user);                                                                                                         
            await _context.SaveChangesAsync();

            return user;
            //throw new System.NotImplementedException();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512())            
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));                                
            }
            //throw new NotImplementedException();
        }

        public async Task<bool> UserExists(string username)
        {
            var user=await _context.Users.FirstOrDefaultAsync(x=>x.UserName==username);

            if(user==null)
            return false;

            return true;
        }
    }
}