--CREATE TABLE [dbo].[Users] (
--    [Id]               NVARCHAR (450) NOT NULL,
--    [UserName]         NVARCHAR (128) NOT NULL,
--    [Email]            NVARCHAR (MAX) NOT NULL,
--    [Password]         NVARCHAR (MAX) NOT NULL,
--    [RetypePassword]   NVARCHAR (MAX) NOT NULL,
--    [CreatedDate]      DATETIME2 (7)  NOT NULL,
--    [LastModifiedDate] DATETIME2 (7)  NOT NULL,
--    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
--);

--CREATE TABLE [dbo].[Storez] (
--    [Id]               INT            IDENTITY (1, 1) NOT NULL,
--    [UserId]           NVARCHAR (450) NOT NULL,
--    [StoreName]        NVARCHAR (MAX) NOT NULL,
--    [CreatedDate]      DATETIME2 (7)  NOT NULL,
--    [LastModifiedDate] DATETIME2 (7)  NOT NULL,
--    CONSTRAINT [PK_Storez] PRIMARY KEY CLUSTERED ([Id] ASC),
--    CONSTRAINT [FK_Storez_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
--);


--GO
--CREATE NONCLUSTERED INDEX [IX_Storez_UserId]
--    ON [dbo].[Storez]([UserId] ASC);



--CREATE TABLE [dbo].[Trending] (
--    [Id]      INT IDENTITY (1, 1) NOT NULL,
--    [StoreId] INT NOT NULL,
--    [Views]   INT NOT NULL,
--    CONSTRAINT [PK_Trending] PRIMARY KEY CLUSTERED ([Id] ASC),
--    CONSTRAINT [FK_Trending_Storez_StoreId] FOREIGN KEY ([StoreId]) REFERENCES [dbo].[Storez] ([Id]) ON DELETE CASCADE
--);


--GO
--CREATE NONCLUSTERED INDEX [IX_Trending_StoreId]
--    ON [dbo].[Trending]([StoreId] ASC);


--CREATE TABLE [dbo].[Product] (
--    [Id]               INT            IDENTITY (1, 1) NOT NULL,
--    [StoreId]          INT            NOT NULL,
--    [ProductName]      NVARCHAR (MAX) NOT NULL,
--    [ImagePath]        NVARCHAR (MAX) NOT NULL,
--    [CreatedDate]      DATETIME2 (7)  NOT NULL,
--    [LastModifiedDate] DATETIME2 (7)  NOT NULL,
--    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC),
--    CONSTRAINT [FK_Product_Storez_StoreId] FOREIGN KEY ([StoreId]) REFERENCES [dbo].[Storez] ([Id]) ON DELETE CASCADE
--);


--GO
--CREATE NONCLUSTERED INDEX [IX_Product_StoreId]
--    ON [dbo].[Product]([StoreId] ASC);

--CREATE TABLE [dbo].[Orders] (
--    [Id]               INT            IDENTITY (1, 1) NOT NULL,
--    [CreateDate]       DATETIME2 (7)  NOT NULL,
--    [LastModifiedDate] DATETIME2 (7)  NOT NULL,
--    [Type]             NVARCHAR (MAX) NOT NULL,
--    [ProductId]        INT            NULL,
--    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED ([Id] ASC),
--    CONSTRAINT [FK_Orders_Product_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id])
--);


--GO
--CREATE NONCLUSTERED INDEX [IX_Orders_ProductId]
--    ON [dbo].[Orders]([ProductId] ASC);







