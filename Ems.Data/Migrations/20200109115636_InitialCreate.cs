using Microsoft.EntityFrameworkCore.Migrations;

namespace Ems.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "grade",
                columns: table => new
                {
                    id = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    description = table.Column<string>(unicode: false, maxLength: 150, nullable: true),
                    cost_multiplier = table.Column<decimal>(type: "decimal(5,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grade", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "position",
                columns: table => new
                {
                    id = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    cost_rate = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_position", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                columns: table => new
                {
                    id = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    name = table.Column<string>(unicode: false, maxLength: 150, nullable: true),
                    grade_id = table.Column<uint>(type: "int(10) unsigned", nullable: false),
                    position_id = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    personal_cost_multiplier = table.Column<decimal>(type: "decimal(5,3)", nullable: false, defaultValueSql: "1.000")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.id);
                    table.ForeignKey(
                        name: "employee_ibfk_1",
                        column: x => x.grade_id,
                        principalTable: "grade",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "employee_ibfk_2",
                        column: x => x.position_id,
                        principalTable: "position",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "grade_id",
                table: "employee",
                column: "grade_id");

            migrationBuilder.CreateIndex(
                name: "position_id",
                table: "employee",
                column: "position_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "employee");

            migrationBuilder.DropTable(
                name: "grade");

            migrationBuilder.DropTable(
                name: "position");
        }
    }
}
