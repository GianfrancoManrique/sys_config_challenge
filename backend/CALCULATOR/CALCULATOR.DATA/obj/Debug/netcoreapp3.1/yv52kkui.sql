IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Configurations] (
    [ConfigurationId] int NOT NULL IDENTITY,
    [MonthOfBirth] varchar(10) NOT NULL,
    [MinAge] int NOT NULL,
    [MaxAge] int NULL,
    [Premium] decimal(8,2) NOT NULL,
    CONSTRAINT [PK_Configurations] PRIMARY KEY ([ConfigurationId])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210217215351_Init', N'5.0.3');
GO

COMMIT;
GO

