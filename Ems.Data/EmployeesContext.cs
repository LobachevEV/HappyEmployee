using System.IO;
using Ems.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Ems.Data
{
    //to use dotnet ef CLI
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<EmployeesContext>
    {
        public EmployeesContext CreateDbContext(string[] args)
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var configuration = new ConfigurationBuilder().SetBasePath(currentDirectory)
                .AddJsonFile($"{currentDirectory}/../Ems.Web/appsettings.Development.json")
                .AddJsonFile($"{currentDirectory}/../Ems.Web/appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("EmsDb");
            var builder = new DbContextOptionsBuilder<EmployeesContext>();
            builder.UseMySql(connectionString);
            return new EmployeesContext(builder.Options);
        }
    }

    public partial class EmployeesContext : DbContext
    {
        public EmployeesContext()
        {
        }

        public EmployeesContext(DbContextOptions<EmployeesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<Grade> Grade { get; set; }
        public virtual DbSet<Position> Position { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasIndex(e => e.GradeId);

                entity.HasIndex(e => e.PositionId);

                entity.Property(e => e.Id)
                    .HasColumnType("int(10) unsigned")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.GradeId)
                    .HasColumnType("int(10) unsigned");

                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalCostMultiplier)
                    .HasColumnType("decimal(5,3)")
                    .HasDefaultValueSql("1.000");

                entity.Property(e => e.PositionId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmploymentDate)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.Grade)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.GradeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_ibfk_1");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.PositionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_ibfk_2");
            });

            modelBuilder.Entity<Grade>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("int(10) unsigned").
                    ValueGeneratedOnAdd();

                entity.Property(e => e.CostMultiplier)
                    .HasColumnType("decimal(5,2)");

                entity.Property(e => e.Description)
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("int(10) unsigned")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CostRate)
                    .HasColumnType("int(11)");
            });
        }
    }
}