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
        public int StoreId { get; set; }

        [Required]
        public string Text { get; set; }

        public string Notes { get; set; }

        [DefaultValue(0)]
        public int Type { get; set; }

        [DefaultValue(0)]
        public int Flags { get; set; }

        [Required]
        public int Views { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region Lazy-load Properties
        /// <summary>
        /// The Id of the most trending product
        /// </summary>
        [ForeignKey("StoreId")]
        public virtual Store Store{get; set;}
        #endregion Lazy-load Properties

    }
}
