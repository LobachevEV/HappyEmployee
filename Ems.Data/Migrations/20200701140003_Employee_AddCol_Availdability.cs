using Microsoft.EntityFrameworkCore.Migrations;

namespace Ems.Data.Migrations
{
    public partial class Employee_AddCol_Availdability : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Availability",
                table: "Employee",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Availability",
                table: "Employee");
        }
    }
}
