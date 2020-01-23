using System.Linq;
using System.Threading.Tasks;
using Ems.Data;
using Ems.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ems.Web.Controllers
{
    [ApiController, Route("api")]
    public class MainController : Controller
    {
        private readonly EmployeesContext _context;

        public MainController(EmployeesContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public JsonResult Employees(int startIndex, int amount)
        {
            var result = _context.Employee.Skip(startIndex);
            if (amount != 0)
            {
                result = result.Take(amount);
            }

            var employees = result.ToList();
            var total = _context.Employee.Count();
            return Json( new {employees, total });
        }

        [HttpPost("[action]")]
        public async Task<Employee> Employee([FromBody] Employee employee)
        {
            var result = _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        [HttpGet("[action]")]
        public JsonResult Grades(int startIndex, int amount)
        {
            var result = _context.Grade.Skip(startIndex);
            if (amount != 0)
            {
                result = result.Take(amount);
            }

            var grades = result.ToList();
            var total = _context.Grade.Count();
            return Json( new {grades, total });
        }

        [HttpGet("[action]")]
        public JsonResult Positions(int startIndex, int amount)
        {
            var result = _context.Position.Skip(startIndex);
            if (amount != 0)
            {
                result = result.Take(amount);
            }

            var positions = result.ToList();
            var total = _context.Position.Count();
            return Json( new {positions, total });
        }
    }
}