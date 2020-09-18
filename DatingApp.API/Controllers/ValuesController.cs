using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DatingApp.API.Controllers
{
    [Authorize]    
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext context;
        public ValuesController(DataContext context)
        {
            this.context = context;
        }

        [AllowAnonymous]                    
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await context.Values.ToListAsync();
            return Ok(data);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await context.Values.FirstOrDefaultAsync(x=>x.Id==id);
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Post()
        {
            return Ok();
        }
        [HttpPut]
        public IActionResult Put()
        {
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            return Ok();
        }

        //Api methods verbs
        //   [HttpGet]
        // public IActionResult Get()
        // {
        //     return Ok();
        // }

        // [HttpGet("{id}")]
        // public IActionResult Get(int id)
        // {
        //     return Ok();
        // }

        // [HttpPost]
        // public IActionResult Post()
        // {
        //     return Ok();
        // }
        // [HttpPut]
        // public IActionResult Put()
        // {
        //     return Ok();
        // }

        // [HttpDelete]
        // public IActionResult Delete()
        // {
        //     return Ok();
        // }

    }
}