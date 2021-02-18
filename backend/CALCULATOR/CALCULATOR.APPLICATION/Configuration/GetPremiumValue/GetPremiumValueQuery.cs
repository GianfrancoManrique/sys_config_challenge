using AutoMapper;
using CALCULATOR.APPLICATION.Configuration.GetPremiumValue;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CALCULATOR.APPLICATION.Configuration.GetPremiumValue
{
    public class GetPremiumValueQuery: IGetPremiumValueQuery
    {
        private readonly IDatabaseService _database;
        private readonly IDatabaseComplexQueriesService _databasec;
        private readonly IMapper _IMapper;

        public GetPremiumValueQuery(IDatabaseService database, IDatabaseComplexQueriesService databasec, IMapper IMapper)
        {
            _database = database;
            _databasec = databasec;
            _IMapper = IMapper;
        }

        public async Task<GetPremiumValueModel> Execute(GetPremiumParamsModel model)
        {
            string _monthofbirth = model.DateOfBirth.Month.ToString();

            var result = await _databasec.GetSingleAsync<GetPremiumValueModel>("usp_SelPremiumValue",
                         new { monthofbirth = _monthofbirth, state = model.State, age = model.Age });

            GetPremiumValueModel premiumValue = _IMapper.Map<GetPremiumValueModel>(result);

            return premiumValue;

        }
    }
}
