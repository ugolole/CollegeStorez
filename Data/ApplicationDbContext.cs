using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Data.Model;


namespace Data
{
    public class ApplicationDbContext : DbContext
    {
        #region Constructor
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        #endregion Constructor

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Stores).WithOne(i => i.User);

            modelBuilder.Entity<Store>().ToTable("Storez");
            modelBuilder.Entity<Store>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Store>().HasOne(i => i.User).WithMany(u => u.Stores);
            modelBuilder.Entity<Store>().HasMany(i => i.Products).WithOne(u => u.Store);
        }
        #endregion Methods
    }
}
