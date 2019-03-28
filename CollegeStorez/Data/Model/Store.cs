using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeStorez.Data.Model
{
    public class Store
    {
        #region Constructor
        public Store()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string OrderId { get; set; }

        [Required]
        public string ProductId { get; set; }

        [Required]
        public string StoreName { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region Lazy-load Properties 
        /// <summary>
        /// The order for store this will be used to generated trend data
        /// </summary>
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }

        /// <summary>
        /// The product Id: it will be loaded first because of lazy-load
        /// </summary>
        [ForeignKey("ProductId")]
        public virtual Product Product {get; set; }
        
        /// <summary>
        /// A list containing all products related to this Store
        /// It will be populated on the first use thanks to Ef lazy
        /// </summary>
        public virtual List<Product> Products { get; set; }
        #endregion Lazy-load Properties

    }
}
