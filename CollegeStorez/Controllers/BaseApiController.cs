using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CollegeStorez.Data;
using CollegeStorez.Data.Model;
using Mapster;

namespace CollegeStorez.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        #region Shared Properties
        protected ApplicationDbContext DbContext { get; private set; }
        protected JsonSerializerSettings JsonSettings { get; private set; }
        #endregion

        #region Constructor
        public BaseApiController(ApplicationDbContext context)
        {
            //instantiate the applicationDbContext through DI
            DbContext = context;

            //Instantiate a single JsonSerializerSettings object
            //that can be used multiple times
            JsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            };
        }
        #endregion
    }
}