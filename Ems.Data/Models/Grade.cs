using System;
using System.Collections.Generic;

namespace Ems.Data.Models
{
    public partial class Grade
    {
        public Grade()
        {
            Employee = new HashSet<Employee>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public decimal? CostMultiplier { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
    }
}
