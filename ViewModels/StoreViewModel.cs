using Newtonsoft.Json;
using System;
using System.ComponentModel;


namespace CollegeStorez.ViewModels
{
    public class StoreViewModel
    {
        #region Constructor
        public StoreViewModel() { }
        #endregion Constructor

        #region Properties
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string Notes { get; set; }
        public string ImagePath { get; set; }
        [DefaultValue(0)]
        public int Type { get; set; }
        [DefaultValue(0)]
        public int Flags { get; set; }
        public string UserId { get; set; }
        [JsonIgnore]
        public int ViewCount { get; set; }
        public string StoreName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties
    }
}
