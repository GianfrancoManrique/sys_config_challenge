using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CALCULATOR.DOMAIN
{
    public class Configuration
    {
        [Key]
        public int ConfigurationId { get; set; }

        [Required][Column(TypeName = "varchar(10)")]
        public string State { get; set; }

        [Required][Column(TypeName = "varchar(10)")]
        public string MonthOfBirth { get; set; }

        [Required]
        public int MinAge { get; set; }

        public int? MaxAge { get; set; }

        [Required][Column(TypeName = "decimal(8,2)")]
        public float Premium { get; set; }

    }
}
