using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CollegeStorez.Controllers
{
    public class BaseApiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}