alter procedure [dbo].[spReportTotalsByCategory] @StartYear int = null, @StartPeriod int = null, @EndYear int = null, @EndPeriod int = null, @CategoryId int = null
as

declare @ReportTotals table (
	CategoryId int, [Year] int, 
	[Period] int, 
	MonthsSinceReportStart int,
	TotalByPeriod money, 
	CreditByPeriod money, 
	DebitByPeriod money, 
	AccumulatedTotalBYPeriod money, 
	AccumulatedCreditByPeriod money, 
	AccumulatedDebitByPeriod money);

declare @StartDate datetime = '01/' + cast(@StartPeriod as varchar) + '/' + cast(@StartYear as varchar)
declare @EndDate datetime = '01/' + cast(@EndPeriod as varchar) + '/' + cast(@EndYear as varchar)
;

with AccountTotals (CategoryId, [Year], [Period], Credit, Debit)
as
(
	select CategoryId, [Year], [Period], sum(Credit) as Credit, sum(Debit) as Debit
	from (select *, DatePart(yyyy, EffDate) [Year], DatePart(m, EffDate) [Period] from Transactions) t
	where (Exclude is null or Exclude = 0)
	group by CategoryId, [Year], [Period]
)

insert into @ReportTotals (CategoryId, [Year], [Period], MonthsSinceReportStart, TotalByPeriod, CreditByPeriod, DebitByPeriod, AccumulatedTotalByPeriod, AccumulatedCreditByPeriod, AccumulatedDebitByPeriod)
select 
	x.CategoryId, 
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
			a.CategoryId = x.CategoryId
			and ((a.[Year] < x.[Year]) or (a.[Year] = x.[Year] and a.[Period] <= x.[Period]))
	), 0) AccumulatedTotalByPeriod,
	
	isnull((
		select sum(isnull(a.Credit, 0))
		from AccountTotals a
		where 
			a.CategoryId = x.CategoryId
			and ((a.[Year] < x.[Year]) or (a.[Year] = x.[Year] and a.[Period] <= x.[Period]))
	), 0) AccumulatedCreditByPeriod,
	
	isnull((
		select sum(isnull(a.Debit, 0)) 
		from AccountTotals a
		where 
			a.CategoryId = x.CategoryId
			and ((a.[Year] < x.[Year]) or (a.[Year] = x.[Year] and a.[Period] <= x.[Period]))
	), 0) AccumulatedDebitByPeriod

from
	(select c.CategoryId, yp.[Year], yp.[Period]
	from Categories c, 
		(select distinct y.number [Year], p.number [Period]
			from master..[spt_values] y,
				master..[spt_values] p
			where 
				y.number between 1900 and 2099
				and p.number between 1 and 12
		) yp
	where 
		(c.CategoryId = @CategoryId or @CategoryId is null)
		and ((yp.[Year] = @StartYear and yp.[Period] >= @StartPeriod) or (yp.[Year] > @StartYear))
		and ((yp.[Year] = @EndYear and yp.[Period] <= @EndPeriod) or (yp.[Year] < @EndYear))
	) x
	left join AccountTotals t on x.CategoryId = t.CategoryId and x.[Year] = t.[Year] and x.[Period] = t.[Period]
group by x.CategoryId, x.[Year], x.[Period]

select [Year], [Period], CategoryId, TotalByPeriod, CreditByPeriod, DebitByPeriod, AccumulatedTotalByPeriod, AccumulatedCreditByperiod, AccumulatedDebitByPeriod, 
	(select round(sum(rt2.TotalByPeriod) / (rt.MonthsSinceReportStart + 1), 2) from @ReportTotals rt2 where rt2.CategoryId = rt.CategoryId and ((rt2.[Year] < rt.[Year]) or (rt2.[Year] = rt.[Year] and rt2.[Period] <= rt.[Period]))) AverageTotalByPeriod,
	(select round(sum(rt2.CreditByPeriod) / (rt.MonthsSinceReportStart + 1), 2) from @ReportTotals rt2 where rt2.CategoryId = rt.CategoryId and ((rt2.[Year] < rt.[Year]) or (rt2.[Year] = rt.[Year] and rt2.[Period] <= rt.[Period]))) AverageCreditByPeriod,
	(select round(sum(rt2.DebitByPeriod) / (rt.MonthsSinceReportStart + 1), 2) from @ReportTotals rt2 where rt2.CategoryId = rt.CategoryId and ((rt2.[Year] < rt.[Year]) or (rt2.[Year] = rt.[Year] and rt2.[Period] <= rt.[Period]))) AverageDebitByPeriod
from @ReportTotals rt