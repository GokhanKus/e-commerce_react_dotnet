using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class UserDto
    {
        public string Name { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}