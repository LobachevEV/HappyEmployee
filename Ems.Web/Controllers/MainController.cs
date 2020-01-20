using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ems.Data;
using Ems.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ems.Web.Controllers
{
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        private readonly EmployeesContext _context;

        public MainController(EmployeesContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Employee> Employees(int startIndex, int amount)
        {
            var result = _context.Employee.Skip(startIndex);
            if (amount != 0)
            {
                result = result.Take(amount);
            }

            var employees = result.ToList();
            return employees;
        }

        [HttpPost("[action]")]
        [HttpPut("[action]")]
        public async Task<Employee> Employee(Employee employee)
        {
            var result = _context.Employee.Any(e => e.Id == employee.Id)
                ? _context.Employee.Update(employee)
                : _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        [HttpGet("[action]")]
        public IEnumerable<Grade> Grades(int startIndex, int amount)
        {
            var result = _context.Grade.Skip(startIndex);
            if (amount != 0)
            {
                result = result.Take(amount);
            }

            var employees = result.ToList();
            return employees;
        }

        [HttpGet("[action]")]
        public IEnumerable<Position> Positions(int startIndex, int amount)
        {
            var result = _context.Position.Skip(startIndex);
            if (amount != 0)
            {
                result = result.Take(amount);
            }

            var employees = result.ToList();
            return employees;
        }
    }
}