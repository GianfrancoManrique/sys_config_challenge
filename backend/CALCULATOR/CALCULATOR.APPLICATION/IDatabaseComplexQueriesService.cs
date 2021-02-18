using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CALCULATOR.APPLICATION
{
    public interface IDatabaseComplexQueriesService
    {
        Task<T> GetSingleAsync<T>(string spName, object parameters = null) where T : class;
    }
}
