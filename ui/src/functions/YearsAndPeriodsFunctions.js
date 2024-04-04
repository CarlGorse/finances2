
function getYearsAndPeriodsFromPeriodCount(periodCount) {
    let year = Math.floor((periodCount - 1) / 12);
    let period = periodCount - (year * 12);

    return { Year: year, Period: period };
  }

  function getPeriodCountFromYearsAndPeriods(year, period) {
    return (year * 12) + period;
  }

export { getYearsAndPeriodsFromPeriodCount, getPeriodCountFromYearsAndPeriods };
