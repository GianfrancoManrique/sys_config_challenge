using CALCULATOR.APPLICATION;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace CALCULATOR.DATA
{
    public class DatabaseComplexQueriesService: DatabaseConnection, IDatabaseComplexQueriesService
    {
        public DatabaseComplexQueriesService(IConfiguration configuration) :base(configuration)
        {

        }

        public async Task<T> GetSingleAsync<T>(string spName, object parameters = null) where T : class
        {
          
            using (IDbConnection cn = Connection)
            {
                cn.Open();
                var results = await cn.QueryAsync<T>(spName, parameters, commandType: CommandType.StoredProcedure);
                return results.FirstOrDefault();
            }

        }
    }
}
