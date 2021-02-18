using CALCULATOR.APPLICATION.Configuration.GetPremiumValue;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CALCULATOR.APPLICATION.Configuration.GetPremiumResult
{
    public interface IGetPremiumValueQuery
    {
        public Task<GetPremiumValueModel> Execute(GetPremiumParamsModel model);
    }
}
