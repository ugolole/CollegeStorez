using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CollegeStorez.Data.Model
{
    public class ApplicationUser : IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {

        }
        #endregion Constructor

        #region Properties
        //[Key]
        //[Required]
        //public string Id { get; set; }

        //[Required]
        //[MaxLength(128)]
        //public string UserName { get; set; }

        //[Required]
        //public string Email { get; set; }

        public string DisplayName { get; set; }
        public string Notes { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public int Flags { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region Lazy-load Properties
        /// <summary>
        /// A list of products available for a given user
        /// </summary>
        public virtual List<Store> Stores {get; set;}
        #endregion Lazy-load Properties

        /// <summary>
        /// A list of all refresh tokens issued for this users.
        /// </summary>
        public virtual List<Token> Tokens { get; set; }
    }
}
