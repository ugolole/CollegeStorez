using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mapster;
using CollegeStorez.Data;
using CollegeStorez.Data.Model;
using CollegeStorez.ViewModels;
using Newtonsoft.Json;

namespace CollegeStorez.Controllers
{
    [Route("api/[controller]")]
    public class StoreController : Controller
    {

        #region Private Fields
        private ApplicationDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public StoreController(ApplicationDbContext context)
        {
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
            if (store == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Store ID {0} has not been found", id)
                });
            }

            return new JsonResult(store.Adapt<StoreViewModel>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            });
        }

        /// <summary>
        /// Add a new store to the database
        /// </summary>
        /// <param name="model">The StoreViewModel containing the data to insert</param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Put([FromBody]StoreViewModel model)
        {
            //return a generic HTTP Status 500 (Server Error)
            //if the client payload is invalide
            if (model == null) return new StatusCodeResult(500);

            //handle the insert (without object mapping)
            var store = new Store();

            //properties taken from the request
            store.Title = model.Title;
            store.Description = model.Description;
            store.Text = model.Text;
            store.Notes = model.Notes;

            //properties set from the server side
            store.CreatedDate = DateTime.Now;
            store.LastModifiedDate = store.CreatedDate;

            //set a temporary creater using the Admin user's userId
            store.UserId = DbContext.Users.Where(u => u.UserName == "Admin").FirstOrDefault().Id;

            //add the new quiz
            DbContext.Stores.Add(store);

            //persist the changes into the Database.
            DbContext.SaveChanges();

            return new JsonResult(store.Adapt<StoreViewModel>(), new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            });
        }

        /// <summary>
        /// Edit the store with given {id}
        /// </summary>
        /// <param name="model">The StoreView Model containing  the data to update</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody]StoreViewModel model)
        {
            //return generic HTTP Status 500 (Server Error)
            //if the client payload is invalid
            if (model == null) return new StatusCodeResult(500);

            //retrieve the store to edit
            var store = DbContext.Stores.Where(s => s.Id == model.Id).FirstOrDefault();

            //handle the request for asking for non-existing stores
            if (store == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Store Id {0} has not been found", model.Id)
                });
            }

            //handle the update (without object mapping)
            //by manually assigning properties
            //we want to accept form teh request
            store.Title = model.Title;
            store.Description = model.Description;
            store.Text = model.Text;
            store.Notes = model.Notes;

            //properties set from server-side
            store.LastModifiedDate = store.CreatedDate;

            //persist the changes to the database
            DbContext.SaveChanges();

            //return the update Store to the client
            return new JsonResult(store.Adapt<StoreViewModel>(), new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            });

        }

        /// <summary>
        /// Delete the store with given {ID} from the database
        /// </summary>
        /// <param name="id">The Id of the existing test</param>
        /// <returns></returns>
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            //retrieve the store from the database
            var store = DbContext.Stores.Where(i => i.Id == id).FirstOrDefault();

            //handle request asking for non-existing stores
            if (store == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Store {0} has not been found", id)
                });
            }

            //remove the store from the DbContext
            DbContext.Stores.Remove(store);

            //persist the changes into the Database
            DbContext.SaveChanges();

            //return an HTTP Status 200 (ok)
            return new OkResult();
        }

        /// <summary>
        /// Retrives the {num} latest stores
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        [HttpGet("Latest/{num:int?}")]
        public IActionResult Lates(int num = 5)
        {
            var latest = DbContext.Stores
                .OrderByDescending(s => s.CreatedDate)
                .Take(num)
                .ToArray();

            return new JsonResult(latest.Adapt<StoreViewModel[]>(),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }

        /// <summary>
        /// GET: api/quiz/Bytitle
        /// Retrieves the {num} sorted by title A To Z
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        [HttpGet("ByTitle/{num:int?}")]
        public IActionResult ByTitle(int num = 5)
        {
            var byTitle = DbContext.Stores
                .OrderBy(s => s.Title)
                .Take(num)
                .ToArray();

            return new JsonResult(byTitle.Adapt<StoreViewModel[]>(),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }

        /// <summary>
        /// GET: api/store/mostViewed
        /// Retrieves the {num} Quizes
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        [HttpGet("Random/{num:int?}")]
        public IActionResult Random(int num = 5)
        {
            var random = DbContext.Stores
                .OrderBy(s => Guid.NewGuid())
                .Take(num)
                .ToArray();

            return new JsonResult(random.Adapt<StoreViewModel[]>(),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }
    }
}