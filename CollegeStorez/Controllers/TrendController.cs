using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CollegeStorez.ViewModels;
using System.Collections.Generic;
using System.Linq;
using CollegeStorez.Data;
using CollegeStorez.Data.Model;
using Mapster;

namespace CollegeStorez.Controllers
{
    [Route("api/[controller]")]
    public class TrendController : BaseApiController
    {
        

        #region Constructor
        public TrendController(ApplicationDbContext context): base(context) { }
        #endregion

        #region RESTful conventions methods
        /// <summary>
        /// Retrieves the Trend with the given {id}
        /// </summary>
        /// <param name="id">The ID of an existing Trend</param>
        /// <returns>the Trend with the given {id}</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var trend = DbContext.Trends.Where(i => i.Id == id).FirstOrDefault();

            // handle requests asking for non-existing trends
            if (trend == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Trend ID {0} has not been found", id)
                });
            }
            return new JsonResult(trend.Adapt<TrendViewModel>(), JsonSettings);
        }

        /// <summary>
        /// Adds a new Result to the Database
        /// </summary>
        /// <param name="model">The ResultViewModel containing the datato insert</param>
        [HttpPut]
        public IActionResult Put([FromBody]TrendViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            // map the ViewModel to the Model
            var trend = model.Adapt<Trend>();
            //override properties that should be set in the client side
            trend.StoreId = model.StoreId;
            trend.Text = model.Text;
            trend.Notes = model.Notes;
            trend.Views = model.Views;

            // override those properties
            // that should be set from the server-side only
            trend.CreatedDate = DateTime.Now;
            trend.LastModifiedDate = trend.CreatedDate;

            // add the new trend
            DbContext.Trends.Add(trend);
            // persist the changes into the Database.
            DbContext.SaveChanges();

            // return the newly-created Result to the client.
            return new JsonResult(trend.Adapt<TrendViewModel>(), JsonSettings);
        }

        /// <summary>
        /// Edit the Trend with the given {id}
        /// </summary>
        /// <param name="model">The TrendViewModel containing the data to update</param>
        [HttpPost]
        public IActionResult Post([FromBody]TrendViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            // retrieve the result to edit
            var trend = DbContext.Trends.Where(q => q.Id ==  model.Id).FirstOrDefault();

            // handle requests asking for non-existing trends
            if (trend == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Trend ID {0} has not been found", model.Id)
                });
            }
            // handle the update (without object-mapping)
            // by manually assigning the properties
            // we want to accept from the request
            trend.StoreId = model.StoreId;
            trend.Text = model.Text;
            trend.Notes = model.Notes;
            trend.Views = model.Views;

            // properties set from server-side
            trend.LastModifiedDate = trend.CreatedDate;
            
            // persist the changes into the Database.
            DbContext.SaveChanges();
            // return the updated Quiz to the client.
            return new JsonResult(trend.Adapt<TrendViewModel>(), JsonSettings);
        }

        /// <summary>
        /// Deletes the Trend with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Trend</param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // retrieve the trend from the Database
            var trend = DbContext.Trends.Where(i => i.Id == id).FirstOrDefault();

            // handle requests asking for non-existing trend
            if (trend == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Trend ID {0} has not been  found", id)
                });
            }

            // remove the quiz from the DbContext.
            DbContext.Trends.Remove(trend);
            // persist the changes into the Database.
            DbContext.SaveChanges();
            // return an HTTP Status 200 (OK).
            return new OkResult();
        }
        #endregion

        // GET api/result/all
        [HttpGet("All/{storeId}")]
        public IActionResult All(int storeId)
        {
            var results = DbContext.Trends
            .Where(q => q.StoreId == storeId)
            .ToArray();
            return new JsonResult(
            results.Adapt<TrendViewModel[]>(), JsonSettings);
        }
    }
}