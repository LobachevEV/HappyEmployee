using System.Linq;
using System.Threading.Tasks;
using Ems.Data;
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

        [HttpPost("[action]")]
        public async Task<object> Save([FromBody] JObject o, [FromQuery] string type)
        {
            var assembly = _context.GetType().Assembly;
            var assemblyName = assembly.GetName().Name;
            var objectType = assembly.GetType($"{assemblyName}.Models.{type}");
            var entity = o.ToObject(objectType);
            var id = objectType.GetProperty("Id")?.GetValue(entity);
            var result = id == null || (uint) id == 0 ? await _context.AddAsync(entity) : _context.Update(entity);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        [HttpGet("[action]")]
        public JsonResult Employees(int startIndex, int amount)
        {
            var employees = _context.Employee.Skip(startIndex);
            var result = new
            {
                employees = amount == 0 ? employees : employees.Take(amount),
                total = _context.Employee.Count()
            };
            return Json(result);
        }

        [HttpGet("[action]")]
        public JsonResult Grades(int startIndex, int amount)
        {
            var grades = _context.Grade.Skip(startIndex);
            var result = new
            {
                grades = amount == 0 ? grades : grades.Take(amount),
                total = _context.Grade.Count()
            };
            return Json(result);
        }

        [HttpGet("[action]")]
        public JsonResult Positions(int startIndex, int amount)
        {
            var positions = _context.Position.Skip(startIndex);
            var result = new
            {
                positions = amount == 0 ? positions : positions.Take(amount),
                total = _context.Position.Count()
            };
            return Json(result);
        }
    }
}