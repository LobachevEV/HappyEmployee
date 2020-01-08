using System;
using System.Collections.Generic;

namespace Ems.Data.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GradeId { get; set; }
        public string PositionId { get; set; }
        public decimal PersonalCostMultiplier { get; set; }

        public virtual Grade Grade { get; set; }
        public virtual Position Position { get; set; }
    }
}
