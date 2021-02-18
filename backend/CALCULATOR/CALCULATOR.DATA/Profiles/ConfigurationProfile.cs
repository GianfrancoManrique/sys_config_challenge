using AutoMapper;
using CALCULATOR.APPLICATION.Configuration.GetPremiumValue;
using CALCULATOR.DOMAIN;
using System;
using System.Collections.Generic;
using System.Text;

namespace CALCULATOR.DATA.Profiles
{
    public class ConfigurationProfile: Profile
    {
        public ConfigurationProfile()
        {
            this.CreateMap<GetPremiumValueModel, PremiumConfiguration>();
            this.CreateMap<PremiumConfiguration, GetPremiumValueModel>();
        }
    }
}
