USE PreCalculatorDB
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('NY','August ',18,45,150,1)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('NY','January',46,65,200.5,1)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('NY','*',18,65,120.99,2)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('AL','November',18,65,85.5,1)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('AL','*',18,65,100,2)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('AK','December',65,null,175.2,1)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('AK','December',18,64,125.16,1)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('AK','*',18,65,100.8,2)
go
insert into dbo.PremiumConfigurations(state,monthofbirth,minage,maxage,premium,priority) values ('*','*',18,65,90,3)
go
