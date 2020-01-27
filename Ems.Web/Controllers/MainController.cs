using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Ems.Data;
using Ems.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

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
            return Json(new {employees, total});
        }

        [HttpPost("[action]")]
        public async Task<object> Save([FromBody] JObject o, [FromQuery] string type)
        {
            var assembly = _context.GetType().Assembly;
            var assemblyName = assembly.GetName().Name;
            var objectType = assembly.GetType($"{assemblyName}.Models.{type}");
            var entity = o.ToObject(objectType);
            var result = await _context.AddAsync(entity);
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
            return Json(new {grades, total});
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
            return Json(new {positions, total});
        }
    }
}