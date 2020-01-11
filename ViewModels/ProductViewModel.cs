﻿using Newtonsoft.Json;
using System;
using System.ComponentModel;

namespace CollegeStorez.ViewModels
{
    public class ProductViewModel
    {
        #region Constructor
        public ProductViewModel() { }
        #endregion Constructor

        #region Properties
        public int Id { get; set; }
        public int StoreId { get; set; }
        public string Text { get; set; }
        public string Notes { get; set; }
        [DefaultValue(0)]
        public int Type { get; set; }
        [DefaultValue(0)]
        public int Flags { get; set; }
        public string ProductName { get; set; }
        public string ImagePath { get; set; }
        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties
    }
}
