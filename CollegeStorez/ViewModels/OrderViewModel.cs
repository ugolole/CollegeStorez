using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;

namespace CollegeStorez.ViewModels
{
    public class OrderViewModel
    {
        #region Constructor
        public OrderViewModel() { }
        #endregion Constructor

        #region Properties
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Text { get; set; }
        public int Value { get; set; }
        public string Note { get; set; }
        [DefaultValue(0)]
        public int Type { get; set; }
        [DefaultValue(0)]
        public int Flags { get; set; }
        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties
    }
}
