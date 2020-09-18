using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOs
{
    public class UserForRegisterDto
    {        
        [Required]
        public string Username{get;set;}       

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You Must Specify Password Between 4 and 8 Charachter")]
        public string Password{get;set;}
    }
}
