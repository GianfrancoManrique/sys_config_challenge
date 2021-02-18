using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CALCULATOR.APPLICATION.Configuration.GetPremiumValue
{
    public class GetPremiumParamsModel
    {
        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string State { get; set; }

        [Required][Range(18,200)]
        public int Age { get; set; }
    }
}
