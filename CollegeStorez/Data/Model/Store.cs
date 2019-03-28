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
        public string ProductId { get; set; }

        [Required]
        public string TrendId { get; set; }

        [Required]
        public string UserId { get; set; }


        [Required]
        public string StoreName { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties


        #region Properties
        /// <summary>
        /// The user that created the store
        /// </summary>
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        /// <summary>
        /// A list containing all products related to this Store
        /// It will be populated on the first use thanks to Ef lazy
        /// </summary>
        public virtual List<Product> Products { get; set; }
     
        /// <summary>
        /// A list containing all trending product to this store.
        /// </summary>
        public virtual List<Trend> Trends { get; set; }
        #endregion Lazy-load Properties
    }
}
