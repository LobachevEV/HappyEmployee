using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ems.Data.Migrations
{
    public partial class Employee_Id_Autogenerate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<uint>(
                name: "id",
                table: "grade",
                type: "int(10) unsigned",
                nullable: false,
                oldClrType: typeof(uint),
                oldType: "int(10) unsigned")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<uint>(
                name: "id",
                table: "employee",
                type: "int(10) unsigned",
                nullable: false,
                oldClrType: typeof(uint),
                oldType: "int(10) unsigned")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<uint>(
                name: "id",
                table: "grade",
                type: "int(10) unsigned",
                nullable: false,
                oldClrType: typeof(uint),
                oldType: "int(10) unsigned")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<uint>(
                name: "id",
                table: "employee",
                type: "int(10) unsigned",
                nullable: false,
                oldClrType: typeof(uint),
                oldType: "int(10) unsigned")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);
        }
    }
}
