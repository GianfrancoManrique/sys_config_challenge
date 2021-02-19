using CALCULATOR.APPLICATION;
using CALCULATOR.DOMAIN;
using Microsoft.EntityFrameworkCore;
using System;

namespace CALCULATOR.DATA
{
    public class DatabaseService: DbContext, IDatabaseService
    {
        public DbSet<PremiumConfiguration> PremiumConfigurations { get; set; }

        public DatabaseService(DbContextOptions<DatabaseService> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        
        }
    }
}
