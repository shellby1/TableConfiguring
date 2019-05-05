namespace TableConfiguring.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DataContext : DbContext
    {
        public DataContext()
            : base("name=Data")
        {
        }

        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customers>()
                .Property(e => e.Name)
                .IsFixedLength();

            modelBuilder.Entity<Customers>()
                .Property(e => e.ContactName)
                .IsFixedLength();

            modelBuilder.Entity<Customers>()
                .Property(e => e.Address)
                .IsFixedLength();

            modelBuilder.Entity<Customers>()
                .Property(e => e.City)
                .IsFixedLength();

            modelBuilder.Entity<Customers>()
                .Property(e => e.Country)
                .IsFixedLength();

            modelBuilder.Entity<Category>()
                .Property(e => e.CategoryName)
                .IsUnicode(false);

            modelBuilder.Entity<Category>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Photo)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Notes)
                .IsUnicode(false);
        }
    }
}
