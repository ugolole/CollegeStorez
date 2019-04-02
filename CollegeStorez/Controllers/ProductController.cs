using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CollegeStorez.ViewModels;
using CollegeStorez.Data;
using Mapster;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CollegeStorez.Data.Model;

namespace CollegeStorez.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        #region Private Fields
        private ApplicationDbContext DbContext;
        #endregion

        #region Construtor
        public ProductController(ApplicationDbContext context)
        {
            //Instantiate the Application through DI
            DbContext = context;
        }
        #endregion Constructor

        #region RESTful conventions method
        /// <summary>
        /// Retrieves the Product with given {id}
        /// </summary>
        /// <param name="id">The ID of an existing Product</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = DbContext.Products.Where(i => i.Id == id).FirstOrDefault();

            //handle a request asking for non existing product
            if(product == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Product ID {0} has not been found ", id)
                });
            }
            return new JsonResult(product.Adapt<ProductViewModel>(), 
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }

        /// <summary>
        /// Adds a new Product to the database
        /// </summary>
        /// <param name="model">The ProductViewModel containing the data to insert</param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Put([FromBody]ProductViewModel model)
        {
            //return a generic HTTP Status 500 (Server Error)
            //if the client payload is invalid
            if (model == null) return new StatusCodeResult(500);

            //map the ViewModel to the model
            var product = model.Adapt<Product>();

            //override those properties
            //that should be set from the server only
            product.StoreId = model.StoreId;
            product.Text = model.Text;
            product.Notes = model.Notes;
            product.ProductName = model.ProductName;
            product.ImagePath = model.ImagePath;

            //set from server-side
            product.CreatedDate = DateTime.Now;
            product.LastModifiedDate = product.CreatedDate;

            //add the product 
            DbContext.Products.Add(product);
            //persist the changes into the database
            DbContext.SaveChanges();

            //return the newly-created Product to the client
            return new JsonResult(product.Adapt<ProductViewModel>(),
                new JsonSerializerSettings() {
                    Formatting = Formatting.Indented
                });
        }

        /// <summary>
        /// Edit the Product with given {id}
        /// </summary>
        /// <param name="model">The product view model</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post([FromBody]ProductViewModel model)
        {
            //return a generic HTTP Status 500 (Server Error)
            //if the client payload is invalid
            if (model == null) return new StatusCodeResult(500);

            //retrieve the product to edit
            var product = DbContext.Products.Where(p => p.Id == model.Id).FirstOrDefault();

            //handle request asking for non-existing questions
            if (product == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Product ID {0} has not been found", model.Id)
                });
            }

            //handle the update (without object-mappling
            //by manually assigning the properties
            //we want to accept from the request
            product.StoreId = model.StoreId;
            product.Text = model.Text;
            product.Notes = model.Text;
            product.ProductName = model.ProductName;
            product.ImagePath = model.ImagePath;

            //properties from the server-side
            product.LastModifiedDate = product.CreatedDate;

            //persist the changes into the database
            DbContext.SaveChanges();

            //return th updated Product to the client
            return new JsonResult(product.Adapt<ProductViewModel>(),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }

        /// <summary>
        /// Deletes the Question with given {ID} from the database
        /// </summary>
        /// <param name="id">The Id of an existing Product</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {

            return null;
        }
        #endregion
    }
}