using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using CollegeStorez.Data.Model;


namespace CollegeStorez.Data
{
    public class DbSeeder
    {
        #region Public Methods
        public static void Seed(ApplicationDbContext dbContext)
        {
            //create default users if there is none
            if (!dbContext.Users.Any()) CreateUsers(dbContext);

            //create default stores (if there is none)
            if (!dbContext.Stores.Any()) CreateStores(dbContext);

        }
        #endregion

        #region Seed Methods
        private static void CreateUsers(ApplicationDbContext dbContext)
        {
            //local variable 
            DateTime createdDate = new DateTime(2016, 02, 05, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            //create the admin applicaiton user account
            var user_Admin = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@conestogac.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //insert the admin user into the database
            dbContext.Users.Add(user_Admin);

            //this if debug is a pre-processor directive also know as a conditional
            //compilation directive - this means that wrapping code will compile only 
            //if the condition matches. The DEBUG condition will be true for release builds
            //and false for debug builds

#if DEBUG
            //Create some sample registered user accounts (if they don't exist already)
            //creating user ivan
            var user_ivan = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "ivan",
                Email = "ivan@conestogac.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //creating user kuljeet
            var user_kuljeet = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "kuljeet",
                Email = "kuljeet@conestoga.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //creating user hinali
            var user_hinali = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "hinali",
                Email = "hinali@conestogac.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //insert the sample registered users into the database
            dbContext.Users.AddRange(user_Admin, user_ivan, user_kuljeet, user_hinali);
#endif
            dbContext.SaveChanges();
        }

        private static void CreateStores(ApplicationDbContext dbContext)
        {
            //local variable 
            DateTime createdDate = new DateTime(2016, 02, 05, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            //retrieve the admin user, which will use as the defaul store creator
            var creatorId = dbContext.Users
                .Where(u => u.UserName == "Admin")
                .FirstOrDefault()
                .Id;

#if DEBUG
            //create 5 sample stores with auto-generated data
            //including products, order, result
            var num = 5;
            for (int i = 1; i <= num; i++)
            {
                CreateSampleStore(dbContext,
                    i,
                    creatorId,
                    num,
                    3,
                    3,
                    3,
                    createdDate.AddDays(-num));
            }
#endif
        }

        private static void CreateSampleStore(ApplicationDbContext dbContext,
            int num,
            string creatorId,
            int ViewCount,
            int numberOfProducts,
            int numberOfOrdersPerProduct,
            int numberOfTrends,
            DateTime createdDate
            )
        {
            var store = new Store()
            {
                UserId = creatorId,
                Title = String.Format("Store {0} Title,", num),
                Description = String.Format("Sample Description for " + "Store {0}", num),
                Text = "sample store created by DBSeeder class ",
                StoreName = "Conestoga College Store",
                ViewCount = ViewCount,
                CreatedDate = createdDate,
                LastModifiedDate = createdDate
            };
            dbContext.Stores.Add(store);
            dbContext.SaveChanges();

            for (int i =0; i < numberOfProducts; i++)
            {
                var product = new Product()
                {
                    StoreId = store.Id,
                    Text = "sample product created by dbSeeder class",
                    ProductName ="produce"+i,
                    ImagePath = "~/Images/"+i,
                    CreatedDate = createdDate,
                    LastModifiedDate = createdDate
                };
                dbContext.Products.Add(product);
                dbContext.SaveChanges();

                for (int i2 = 0; i2< numberOfOrdersPerProduct; i2++)
                {
                    var e2 = dbContext.Orders.Add(new Order()
                    {
                        ProductId = product.Id,
                        Text = "sample order created by seeder ",
                        Value = 12,
                        CreateDate = createdDate,
                        LastModifiedDate = createdDate
                    });
                }
            }
            for (int i =0; i < numberOfTrends; i++)
            {
                dbContext.Trends.Add(new Trend()
                {
                    StoreId = store.Id,
                    Text = "sample Trend created by dbSeeder class",
                    Views = (new Random()).Next(2),
                    CreatedDate = createdDate,
                    LastModifiedDate = createdDate

                });
            }
            dbContext.SaveChanges();
        }
        #endregion Seed Methods
    }
}
