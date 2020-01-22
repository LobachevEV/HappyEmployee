using System.Text.Json.Serialization;

namespace Ems.Data.Models
{
    public partial class Employee
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public uint GradeId { get; set; }
        public string PositionId { get; set; }
        public decimal PersonalCostMultiplier { get; set; }

        [JsonIgnore]
        public virtual Grade Grade { get; set; }
        [JsonIgnore]
        public virtual Position Position { get; set; }
    }
}
