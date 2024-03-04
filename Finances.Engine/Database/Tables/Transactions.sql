
CREATE TABLE [dbo].[Transactions](
	[TransactionId] [int] IDENTITY(1,1) NOT NULL,
	[EffDate] [date] NULL,
	[AccountId] [int] NULL,
	[CategoryId] [int] NULL,
	[Description] [varchar](100) NULL,
	[Credit] [money] NULL,
	[Debit] [money] NULL,
	[IsWage] [bit] NULL,
	[Exclude] [bit] NULL,
	[Item] [varchar](100) NULL,
	[DateModified] [datetime] NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Accounts] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Accounts] ([AccountId])
GO

ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Accounts]
GO

ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([CategoryId])
GO

ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Categories]
GO