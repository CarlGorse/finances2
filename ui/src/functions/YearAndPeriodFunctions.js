
function getYearsAndPeriodsFromPeriodCount(periodCount) {
  let year = Math.floor((periodCount - 1) / 12);
  let period = periodCount - (year * 12);

  return { Year: year, Period: period };
}

function getPeriodCountFromYearsAndPeriods(year, period) {
  return (year * 12) + period;
}

function isYearAndPeriodSearchValid(yearAndPeriodSearch) {

  if (!yearAndPeriodSearch.StartPeriod
    || !yearAndPeriodSearch.StartYear
    || !yearAndPeriodSearch.EndPeriod
    || !yearAndPeriodSearch.EndYear) {
    return false;
  }

  if (yearAndPeriodSearch.EndYear < yearAndPeriodSearch.StartYear) {
    return false;
  }

  if ((yearAndPeriodSearch.EndYear === yearAndPeriodSearch.StartYear)
    && yearAndPeriodSearch.EndPeriod < yearAndPeriodSearch.StartPeriod) {
    return false;
  }

  return true;
}

function getYearAndPeriodCountFromDate(date) {
  let yearInPeriods = (date.getFullYear() * 12);
  let periods = date.getMonth() + 1;
  return yearInPeriods + periods;
}

export {
  getPeriodCountFromYearsAndPeriods, getYearAndPeriodCountFromDate,
  getYearsAndPeriodsFromPeriodCount, isYearAndPeriodSearchValid
};

