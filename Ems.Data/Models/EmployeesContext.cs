using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Ems.Data.Models
{
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
                entity.ToTable("employee", "salaries");

                entity.HasIndex(e => e.GradeId)
                    .HasName("grade_id");

                entity.HasIndex(e => e.PositionId)
                    .HasName("position_id");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(10) unsigned");

                entity.Property(e => e.GradeId)
                    .HasColumnName("grade_id")
                    .HasColumnType("int(10) unsigned");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalCostMultiplier)
                    .HasColumnName("personal_cost_multiplier")
                    .HasColumnType("decimal(5,3)")
                    .HasDefaultValueSql("1.000");

                entity.Property(e => e.PositionId)
                    .IsRequired()
                    .HasColumnName("position_id")
                    .HasMaxLength(50)
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
                entity.ToTable("grade", "salaries");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(10) unsigned");

                entity.Property(e => e.CostMultiplier)
                    .HasColumnName("cost_multiplier")
                    .HasColumnType("decimal(5,2)");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.ToTable("position", "salaries");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CostRate)
                    .HasColumnName("cost_rate")
                    .HasColumnType("int(11)");
            });
        }
    }
}
