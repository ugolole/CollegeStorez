using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mapster;
using CollegeStorez.Data;
using CollegeStorez.ViewModels;
using Newtonsoft.Json;

namespace CollegeStorez.Controllers
{
    public class StoreController : Controller
    {

        #region Private Fields
        private ApplicationDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public StoreController(ApplicationDbContext context){
            DbContext = context;
        }
        #endregion Constructor 

        /// <summary>
        /// Retrieves the store with given id
        /// </summary>
        /// <param name="id">The id of the existing store</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var store = DbContext.Stores.Where(i => i.Id == id).FirstOrDefault();

            //handle request asking for non-existing stores
            if (store == null )
            {
                return NotFound(new {
                    Error = String.Format("Store ID {0} has not been found", id)
                });
            }

            return new JsonResult(store.Adapt<StoreViewModel>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            });
        }


    }
}