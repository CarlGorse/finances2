
CREATE TABLE [dbo].[Categories](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[GroupId] [int] NULL,
	[GroupDisplayOrder] [int] NOT NULL,
	[DoNotDisplay] bit NULL
PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_CategoryGroups] FOREIGN KEY([GroupId])
REFERENCES [dbo].[CategoryGroups] ([CategoryGroupId])
GO

ALTER TABLE [dbo].[Categories] CHECK CONSTRAINT [FK_Categories_CategoryGroups]
GO