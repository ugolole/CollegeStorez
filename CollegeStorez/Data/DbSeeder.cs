using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using CollegeStorez.Data.Model;
using Microsoft.AspNetCore.Identity;

//Below are the command you will need to use when generating the complete database
//from scratch.
//dotnet ef migrations add "Identity" -o "Data\Migrations"
//dotnet ef database drop
//dotnet ef database update
namespace CollegeStorez.Data
{
    public class DbSeeder
    {
        #region Public Methods
        public static void Seed(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            //create default users if there is none
            if (!dbContext.Users.Any())
            {
                CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();
            }

            //create default stores (if there is none)
            if (!dbContext.Stores.Any()) CreateStores(dbContext);

        }
        #endregion

        #region Seed Methods
        private static async Task  CreateUsers(ApplicationDbContext dbContext, 
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            //local variable 
            DateTime createdDate = new DateTime(2016, 02, 05, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            //adding variable for both the administrator and regiestered user.
            string role_Administrator = "Administrator";
            string role_RegisteredUser = "RegisteredUser";

            //Create roles (if they do already exist)
            if(!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Administrator));
            }

            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            }

            //create the admin applicaiton user account
            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(), //this replaces the previous Id standard
                UserName = "Admin",
                Email = "admin@conestogac.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //insert the admin user into the database and assign the "Administrator"
            //and Registered User role to hime
            //dbContext.Users.Add(user_Admin);
            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass4Admin");
                await userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);

                //Remove lockout and E-mail confirmation.
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

            //this if debug is a pre-processor directive also know as a conditional
            //compilation directive - this means that wrapping code will compile only 
            //if the condition matches. The DEBUG condition will be true for release builds
            //and false for debug builds

#if DEBUG
            //Create some sample registered user accounts (if they don't exist already)
            //creating user ivan
            var user_ivan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(), //this replaces the previous Id standard
                UserName = "ivan",
                Email = "ivan@conestogac.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //creating user kuljeet
            var user_kuljeet = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(), //this replaces the previous Id standard
                UserName = "kuljeet",
                Email = "kuljeet@conestoga.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //creating user hinali
            var user_hinali = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(), //this replaces the previous Id standard
                UserName = "hinali",
                Email = "hinali@conestogac.on.ca",
                CreatedDate = createdDate,
                LastModifiedDate = DateTime.Now
            };

            //insert the sample registered users into the database and also assign the 
            //"Registered" role to him.
            //dbContext.Users.AddRange(user_Admin, user_ivan, user_kuljeet, user_hinali);
            if (await userManager.FindByNameAsync(user_ivan.UserName) == null)
            {
                await userManager.CreateAsync(user_ivan, "Pass4Ivan");
                await userManager.AddToRoleAsync(user_ivan, role_RegisteredUser);

                //remove lockout and email confirmation
                user_ivan.EmailConfirmed = true;
                user_ivan.LockoutEnabled = false;
            }

            if (await userManager.FindByNameAsync(user_kuljeet.UserName) == null)
            {
                await userManager.CreateAsync(user_kuljeet, "Pass4Kuljeet");
                await userManager.AddToRoleAsync(user_kuljeet, role_RegisteredUser);

                //remove lockout and email confirmation
                user_kuljeet.EmailConfirmed = true;
                user_kuljeet.LockoutEnabled = false;
            }

            if (await userManager.FindByNameAsync(user_hinali.UserName )== null)
            {
                await userManager.CreateAsync(user_hinali, "Pass4Hinali");
                await userManager.AddToRoleAsync(user_hinali, role_RegisteredUser);

                //remove lockout and email confirmation
                user_hinali.EmailConfirmed = true;
                user_hinali.LockoutEnabled = false;
            }
#endif
           await dbContext.SaveChangesAsync(); //new improved method that supporst asynchronous operations.
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
                        CreatedDate = createdDate,
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
