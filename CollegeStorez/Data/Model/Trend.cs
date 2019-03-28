using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeStorez.Data.Model
{
    public class Trend
    {
        #region Constructor
        public Trend()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string ProductId { get; set; }

        [Required]
        public int Views { get; set; }
        #endregion Properties

        #region Lazy-load Properties
        /// <summary>
        /// The Id of the most trending product
        /// </summary>
        [ForeignKey("ProductId")]
        public virtual Product Product{get; set;}

        /// <summary>
        /// List of the most wanted products
        /// </summary>
        [Required]
        public virtual List<Product> MostWanted { get; set; }
        #endregion Lazy-load Properties
    }
}
