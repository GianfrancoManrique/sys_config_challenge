using CALCULATOR.APPLICATION;
using CALCULATOR.DOMAIN;
using Microsoft.EntityFrameworkCore;
using System;

namespace CALCULATOR.DATA
{
    public class DatabaseService: DbContext, IDatabaseService
    {
        public DbSet<Configuration> Configurations { get; set; }

        public DatabaseService(DbContextOptions<DatabaseService> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"
            //Server=tcp:devmasterperu.database.windows.net,1433;Initial Catalog=PreCalculatorDB;Persist Security Info=False;User ID=student;Password=Qazw3579@_;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            //base.OnConfiguring(optionsBuilder);
        }
    }
}
