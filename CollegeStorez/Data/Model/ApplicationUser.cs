using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
