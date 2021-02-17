using CALCULATOR.DOMAIN;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CALCULATOR.APPLICATION
{
    public interface IDatabaseService
    {
        DbSet<Configuration> Configurations { get; set; }
    }
}
