using System;
using System.Collections.Generic;

namespace Ems.Data.Models
{
    public partial class Position
    {
        public Position()
        {
            Employee = new HashSet<Employee>();
        }

        public string Id { get; set; }
        public int CostRate { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
    }
}
