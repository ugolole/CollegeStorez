using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CollegeStorez.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollegeStorez.Data;
using CollegeStorez.Data.Model;
using Mapster;

namespace CollegeStorez.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : BaseApiController
    {


        #region Constructor
        public OrderController(ApplicationDbContext context) : base(context) { }
        #endregion

        #region RESTful conventions methods
        /// <summary>
        /// Retrieves the order for a given ID
        /// </summary>
        /// <param name="id">the Id for an existing order</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var order = DbContext.Orders.Where(i => i.Id == id).FirstOrDefault();

            //handle request asking for non-existing order
            if (order == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Order ID {0} has not been found", id)
                });
            }
            return new JsonResult(order.Adapt<OrderViewModel>(), , JsonSettings);
        }

        /// <summary>
        /// Adds a new Order to the Database
        /// </summary>
        /// <param name="model">The OrderViewModel containing the data to insert</param>
        [HttpPut]
        public IActionResult Put([FromBody]OrderViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            // map the ViewModel to the Model
            var order = model.Adapt<Order>();

            // override those properties 
            //   that should be set from the server-side only
            order.ProductId = model.ProductId;
            order.Text = model.Text;
            order.Note = model.Note;

            //properties set from server-side
            order.CreatedDate = DateTime.Now;
            order.LastModifiedDate = order.CreatedDate;

            // add the new answer
            DbContext.Orders.Add(order);
            // persist the changes into the Database.
            DbContext.SaveChanges();

            // return the newly-created Answer to the client.
            return new JsonResult(order.Adapt<OrderViewModel>(), , JsonSettings);
        }


        /// <summary>
        /// Edit the Order with the given {id}
        /// </summary>
        /// <param name="model">The OrderViewModel containg the data</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody]OrderViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            // retrieve the order to edit
            var order = DbContext.Orders.Where(q => q.Id == model.Id).FirstOrDefault();

            // handle requests asking for non-existing answers
            if (order == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Order ID {0} has not been found", model.Id)
                });
            }
            // handle the update (without object-mapping)
            // by manually assigning the properties
            // we want to accept from the request
            order.ProductId = model.ProductId;
            order.Text = model.Text;
            order.Value = model.Value;
            order.Note = model.Note;

            // properties set from server-side
            order.LastModifiedDate = order.CreatedDate;
            // persist the changes into the Database.
            DbContext.SaveChanges();
            // return the updated Order to the client.
            return new JsonResult(order.Adapt<OrderViewModel>(), JsonSettings);
        }

        /// <summary>
        /// Deletes the Order with the given {id} from the Database
        /// </summary>
        /// <param name="id">The ID of an existing Order</param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // retrieve the order from the Database
            var order = DbContext.Orders.Where(i => i.Id == id).FirstOrDefault();
            // handle requests asking for non-existing order
            if (order == null)
            {
                return NotFound(new
                {
                    Error = String.Format("order ID {0} has not been found", id)
                });
            }
            // remove the quiz from the DbContext.
            DbContext.Orders.Remove(order);
            // persist the changes into the Database.
            DbContext.SaveChanges();
            // return an HTTP Status 200 (OK).
            return new OkResult();
        }
        #endregion

        // GET api/order/all
        [HttpGet("All/{productId}")]
        public IActionResult All(int productId)
        {
            var orders = DbContext.Orders
            .Where(q => q.ProductId == productId)
            .ToArray();
            return new JsonResult(
            orders.Adapt<OrderViewModel[]>(), JsonSettings);
        }
    }
}