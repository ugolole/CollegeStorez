using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CollegeStorez.Data.Model
{
    public class Order
    {
        #region Constructor
        public Order()
        {

        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string UserId { get; set; }

        #endregion Properties 
        /// <summary>
        /// The user that has made a particular order
        /// </summary>
        #region Lazy-load Properties
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
        #endregion Lazy-load Properties
    }
}
