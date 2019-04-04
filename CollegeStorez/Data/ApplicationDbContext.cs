using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using CollegeStorez.Data.Model;


namespace CollegeStorez.Data
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

            modelBuilder.Entity<Product>().ToTable("Products");
            modelBuilder.Entity<Product>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Product>().HasOne(i => i.Store).WithMany(u => u.Products);
            modelBuilder.Entity<Product>().HasMany(i => i.Order).WithOne(c => c.Product);

            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<Order>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Order>().HasOne(i => i.Product).WithMany(u => u.Order);

            modelBuilder.Entity<Trend>().ToTable("Trending");
            modelBuilder.Entity<Trend>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Trend>().HasOne(i => i.Store).WithMany(u => u.Trends);
        }
        #endregion Methods

        #region Properties
        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Trend> Trends { get; set; }

        #endregion Properties

    }
}
