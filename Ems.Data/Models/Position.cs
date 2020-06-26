using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Ems.Data.Models
{
    public partial class Position
    {
        public uint Id { get; set; }
        public string Title { get; set; }
        public int CostRate { get; set; }

        [JsonIgnore]
        public virtual ICollection<Employee> Employee { get; set; } = new HashSet<Employee>();
    }
}
