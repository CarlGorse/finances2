
ALTER procedure [dbo].[spReportTotalsByAccount] @StartYear int = null, @StartPeriod int = null, @EndYear int = null, @EndPeriod int = null, @AccountId int = null
as

declare @ReportTotals table (
	AccountId int, [Year] int, [Period] int,
	MonthsSinceReportStart int,
	TotalByPeriod money, CreditByPeriod money, DebitByPeriod money, 
	AccumulatedTotalBYPeriod money, AccumulatedCreditByperiod money, AccumulatedDebitByPeriod money);

declare @YearsAndMonths table ([Year] int, [Month] int)
declare @StartDate datetime = '01/' + cast(@StartPeriod as varchar) + '/' + cast(@StartYear as varchar)
declare @EndDate datetime = '01/' + cast(@EndPeriod as varchar) + '/' + cast(@EndYear as varchar)
insert @YearsAndMonths ([Year], [Month])
select year(StartOfMonth) [Year], month(StartOfMonth) [Month]
from (
	select dateadd(month, x.number, @StartDate) StartOfMonth
	from master.dbo.spt_values x
	where x.[type] = 'P'        
		and x.number <= datediff(month, @StartDate, @EndDate)
) x
;

with AccountTotals (AccountId, [Year], [Period], Credit, Debit)
as
(
	select AccountId, [Year], [Period], sum(Credit) as Credit, sum(Debit) as Debit
	from Transactions t
	where (Exclude is null or Exclude = 0)
	group by AccountId, [Year], [Period]
)

insert into @ReportTotals (AccountId, [Year], [Period], MonthsSinceReportStart, TotalByPeriod, CreditByPeriod, DebitByPeriod, AccumulatedTotalByPeriod, AccumulatedCreditByPeriod, AccumulatedDebitByPeriod)
select 
	x.AccountId, 
	x.[Year], 
	x.[Period], 

	((x.[Year] * 12) + x.[Period]) - ((@StartYear * 12) + @StartPeriod) MonthsSinceReportStart,

	sum(isnull(t.Credit, 0)) - sum(isnull(t.Debit, 0)) TotalByPeriod,
	
	sum(isnull(t.Credit, 0)) CreditByPeriod,
	
	sum(isnull(t.Debit, 0)) DebitByPeriod,
	
	isnull((
		select sum(isnull(a.Credit, 0)) - sum(isnull(a.Debit, 0)) 
		from AccountTotals a
		where 
			a.AccountId = x.AccountId
			and ((a.[Year] < x.[Year]) or (a.[Year] = x.[Year] and a.[Period] <= x.[Period]))
	), 0) AccumulatedTotalByPeriod,
	
	isnull((
		select sum(isnull(a.Credit, 0))
		from AccountTotals a
		where 
			a.AccountId = x.AccountId
			and ((a.[Year] < x.[Year]) or (a.[Year] = x.[Year] and a.[Period] <= x.[Period]))
	), 0) AccumulatedCreditByPeriod,
	
	isnull((
		select sum(isnull(a.Debit, 0)) 
		from AccountTotals a
		where 
			a.AccountId = x.AccountId
			and ((a.[Year] < x.[Year]) or (a.[Year] = x.[Year] and a.[Period] <= x.[Period]))
	), 0) AccumulatedDebitByPeriod

from
	(select a.AccountId, yp.[Year], yp.[Period]
	from Accounts a, YearsAndPeriods yp
	where 
		(a.AccountId = @AccountId or @AccountId is null)
		and ((yp.[Year] = @StartYear and yp.[Period] >= @StartPeriod) or (yp.[Year] > @StartYear))
		and ((yp.[Year] = @EndYear and yp.[Period] <= @EndPeriod) or (yp.[Year] < @EndYear))
	) x
	left join AccountTotals t on x.AccountId = t.AccountId and x.[Year] = t.[Year] and x.[Period] = t.[Period]
group by x.AccountId, x.[Year], x.[Period]

select [Year], [Period], AccountId, TotalByPeriod, CreditByPeriod, DebitByPeriod, AccumulatedTotalByPeriod, AccumulatedCreditByperiod, AccumulatedDebitByPeriod, 
	(select round(sum(rt2.TotalByPeriod) / (rt.MonthsSinceReportStart + 1), 2) from @ReportTotals rt2 where rt2.AccountId = rt.AccountId and ((rt2.[Year] < rt.[Year]) or (rt2.[Year] = rt.[Year] and rt2.[Period] <= rt.[Period]))) AverageTotalByPeriod,
	(select round(sum(rt2.CreditByPeriod) / (rt.MonthsSinceReportStart + 1), 2) from @ReportTotals rt2 where rt2.AccountId = rt.AccountId and ((rt2.[Year] < rt.[Year]) or (rt2.[Year] = rt.[Year] and rt2.[Period] <= rt.[Period]))) AverageCreditByPeriod,
	(select round(sum(rt2.DebitByPeriod) / (rt.MonthsSinceReportStart + 1), 2) from @ReportTotals rt2 where rt2.AccountId = rt.AccountId and ((rt2.[Year] < rt.[Year]) or (rt2.[Year] = rt.[Year] and rt2.[Period] <= rt.[Period]))) AverageDebitByPeriod
from @ReportTotals rt

