﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SehirRehber.API.Dtos
{
    public class UserForLoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
