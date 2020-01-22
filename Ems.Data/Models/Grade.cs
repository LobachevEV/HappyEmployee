using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Ems.Data.Models
{
    public partial class Grade
    {
        public uint Id { get; set; }
        public string Description { get; set; }
        public decimal? CostMultiplier { get; set; }

        [JsonIgnore]
        public virtual ICollection<Employee> Employee { get; set; } = new HashSet<Employee>();
    }
}
