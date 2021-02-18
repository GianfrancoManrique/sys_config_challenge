using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace CALCULATOR.DATA
{
    public class DatabaseConnection
    {
        public IConfiguration Configuration { get; }

        public DatabaseConnection(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(Configuration.GetConnectionString("PremCalculator"));
            }
        }
    }
}
