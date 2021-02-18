using AutoMapper;
using CALCULATOR.APPLICATION.Configuration.GetPremiumResult;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CALCULATOR.APPLICATION.Configuration.GetPremiumValue
{
    public class GetPremiumValueQuery: IGetPremiumValueQuery
    {
        private readonly IDatabaseService _database;
        private readonly IMapper _IMapper;

        public GetPremiumValueQuery(IDatabaseService database, IMapper IMapper)
        {
            _database = database;
            _IMapper = IMapper;
        }

        public async Task<GetPremiumValueModel> Execute(GetPremiumParamsModel model)
        {
            throw new NotImplementedException();
        }
    }
}
