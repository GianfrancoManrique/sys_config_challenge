using CALCULATOR.APPLICATION.Configuration.GetPremiumValue;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CALCULATOR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ConfigurationController : Controller
    {
        private readonly IGetPremiumValueQuery _IGetPremiumValueQuery;

        public ConfigurationController(IGetPremiumValueQuery IGetPremiumValueQuery)
        {
            _IGetPremiumValueQuery = IGetPremiumValueQuery;
        }

        [HttpPost]
        public async Task<ActionResult> GetPremiumValue([FromBody] GetPremiumParamsModel model)
        {
            if (model == null)
                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool ageIsValid = ValidateAge(model.DateOfBirth, model.Age);

            if (!ageIsValid)
                return BadRequest("Age is not valid");

            var configuration = await _IGetPremiumValueQuery.Execute(model);

            if(configuration==null)
                return BadRequest("There isn't a premium value for these parameters.");

            return Ok(configuration);
        }

        private bool ValidateAge(DateTime dateOfBirth, int age)
        {
            bool isValid=false;
           
            if(dateOfBirth <= DateTime.Now)
            {
                int _age = DateTime.Now.Year - dateOfBirth.Year;
                int _monthDif = DateTime.Now.Month - dateOfBirth.Month;

                if (_monthDif<0 || (_monthDif==0 && DateTime.Now.Day< dateOfBirth.Day)) 
                {
                    _age = _age - 1;
                }

                isValid = _age == age ? true : false;
            }

            return isValid;
        }
    }
}
