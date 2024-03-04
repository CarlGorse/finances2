alter procedure [dbo].[spReportTransactionRunningTotals] (
	@AccountId int, 
	@StartYear int = null, @StartPeriod int = null, 
	@EndYear int = null, @EndPeriod int = null, 
	@StartEffDate datetime = null, @EndEffDate datetime = null)
as

with t as (
	select t.*, datepart(yyyy, t.EffDate) [Year], datepart(m, t.EffDate) [Period], cg.[Name] + '|' + c.Name CategoryName
		from Transactions t 
		join Categories c on t.CategoryId = c.CategoryId
		join CategoryGroups cg on c.GroupId = cg.CategoryGroupId
)

select t.TransactionId, 
	isnull(sum(tPre.Credit), 0) RunningCredit, 
	isnull(sum(tPre.Debit), 0) RunningDebit, 
	isnull(sum(tPre.Credit), 0) - isnull(sum(tPre.Debit), 0) RunningTotal
from t 
	join t tPre
		on t.AccountId = tPre.AccountId and tPre.Exclude = 0
			and (
				t.[Year] > tPre.[Year]
				or (t.[Year] = tPre.[Year] and t.[Period] > tPre.[Period])
				or (t.[Year] = tPre.[Year] and t.[Period] = tPre.[Period] and (
							t.[EffDate] > tPre.[EffDate])
							or (
								t.[EffDate] = tPre.[EffDate]
								and (
									(t.IsWage = 1 and tPre.IsWage = 1 and t.CategoryName < tPre.CategoryName)
									or (t.IsWage = 1 and tPre.IsWage = 1 and t.CategoryName = tPre.CategoryName and t.TransactionId >= tPre.TransactionId)			
									or (t.IsWage = 0 and tPre.IsWage = 0 and t.TransactionId >= tPre.TransactionId)			
								)
						)
					)
				
				)
			
			
where
	t.AccountId = @AccountId
	and (
		((t.[Year] = @StartYear and t.[Period] >= @StartPeriod) or (t.[Year] > @StartYear))
			or (t.[Year] >= @StartYear and @StartPeriod is null)
			or (@StartYear is null and t.[Period] >= @StartPeriod)
			or (@StartYear is null and @StartPeriod is null)
		)
	and (
		((t.[Year] = @EndYear and t.[Period] <= @EndPeriod) or (t.[Year] < @EndYear))
			or (t.[Year] <= @EndYear and @EndPeriod is null)
			or (@EndYear is null and t.[Period] <= @EndPeriod)
			or (@EndYear is null and @EndPeriod is null)
		)

	and (t.EffDate >= @StartEffDate or @StartEffDate is null)
	and (t.EffDate <= @EndEffDate or @EndEffDate is null)
group by t.[Year], t.[Period], t.EffDate, t.IsWage, t.CategoryName, t.[Description], t.TransactionId
order by t.[Year] desc, t.[Period] desc, t.EffDate desc, case when t.IsWage = 1 then t.CategoryName end asc, case when t.IsWage = 1 then t.[Description] end asc, t.TransactionId desc