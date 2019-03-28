using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeStorez.Data.Model
{
    public class Product
    {
        #region Constructor
        public Product()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string StoreId { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string ImagePath { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties


        #region Lazy-load Properties 
        /// <summary>
        /// The parent of the Product which is store
        /// </summary>
        [ForeignKey("StoreId")]
        public virtual Store Store { get; set; }

        /// <summary>
        /// Produce a list of orders for a certain product
        /// </summary>
        public virtual List<Order> Order { get; set; }
        #endregion Lazy-load Properties
    }
}
