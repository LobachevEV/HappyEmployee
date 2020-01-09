using System.Collections.Generic;
using System.Linq;
using Ems.Data;
using Ems.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ems.Web.Controllers
{
    [Route("api/[controller]")]
    public class MainController : Controller
    {
        private EmployeesContext _context;

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