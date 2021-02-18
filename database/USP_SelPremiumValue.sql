USE PreCalculatorDB
go

create procedure dbo.USP_SelPremiumValue
(
@monthofbirth varchar(10),@state varchar(10),@age int
)
as
begin
	select top(1) state,monthofbirth,minage,maxage,premium
	from   dbo.PremiumConfigurations
	where (rtrim(ltrim(upper(state)))=rtrim(ltrim(upper(@state))) or state='*') and
	      (rtrim(ltrim(upper(monthofbirth)))=rtrim(ltrim(upper(@monthofbirth))) or monthofbirth='*') and
		  @age between minage and isnull(maxage,@age)
	order by priority asc
end

--execute usp_SelPremiumValue @monthofbirth='August',@state='NY',@age=18
