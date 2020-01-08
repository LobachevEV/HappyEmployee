using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}