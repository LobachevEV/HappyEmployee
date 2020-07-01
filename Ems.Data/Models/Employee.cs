using System;
using System.Text.Json.Serialization;

namespace Ems.Data.Models
{
    public partial class Employee
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public uint GradeId { get; set; }
        public uint PositionId { get; set; }
        public decimal PersonalCostMultiplier { get; set; }
        public DateTimeOffset EmploymentDate { get; set; }
        public EmployeeAvailability Availability { get; set; }

        [JsonIgnore]
        public virtual Grade Grade { get; set; }
        [JsonIgnore]
        public virtual Position Position { get; set; }
    }
    
    public enum EmployeeAvailability  {
        WillStartWorkSoon,
        Available,
        SickLeave,
        Vacation
    }
}
