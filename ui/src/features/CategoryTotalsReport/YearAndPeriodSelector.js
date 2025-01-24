import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { getYearAndPeriodCountFromDate, getYearsAndPeriodsFromPeriodCount, getPeriodCountFromYearsAndPeriods } from 'functions/YearAndPeriodFunctions';
import PeriodSelector from './PeriodSelector'
import YearSelector from './YearSelector'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchState';

function YearAndPeriodSelector({ reportPeriods }) {

  const [selectedYearAndPeriod, setSelectedYearAndPeriod] = useRecoilState(yearAndPeriodSearchState);
  const [yearAndPeriodCount, setYearAndPeriodCount] = useState((2024 * 12) + 4);

  useEffect(() => {
    setYearAndPeriodCount(getYearAndPeriodCountFromDate(new Date()));
  }, []);

  useEffect(() => {

    let startYearAndPeriod = getYearsAndPeriodsFromPeriodCount(yearAndPeriodCount);
    let endYearAndPeriod = getYearsAndPeriodsFromPeriodCount(yearAndPeriodCount + (reportPeriods - 1));

    setSelectedYearAndPeriod({
      StartYear: startYearAndPeriod.Year,
      StartPeriod: startYearAndPeriod.Period,
      EndYear: endYearAndPeriod.Year,
      EndPeriod: endYearAndPeriod.Period
    });
  }, [setSelectedYearAndPeriod, yearAndPeriodCount, reportPeriods])

  if (!selectedYearAndPeriod) {
    return;
  }

  return (
    <>

      <Button
        size="sm"
        onClick={() => { setYearAndPeriodCount(prevValue => prevValue - 1); }}
      >
        {"<"}
      </Button>

      <Button
        size="sm"
        style={{ marginLeft: "1px" }}
        onClick={() => { setYearAndPeriodCount(prevValue => prevValue + 1); }}
      >
        {">"}
      </Button>

      <Row style={{ marginTop: "20px" }}>

        <Col xs={1}>From:</Col>

        <Col xs={1}>
          <PeriodSelector
            onSelect={value => {
              let periodCount = getPeriodCountFromYearsAndPeriods(selectedYearAndPeriod.StartYear, Number(value));
              setYearAndPeriodCount(periodCount);
            }}
          />
        </Col>

        <Col>
          <YearSelector
            onSelect={value => {
              let periodCount = getPeriodCountFromYearsAndPeriods(Number(value), selectedYearAndPeriod.StartPeriod);
              setYearAndPeriodCount(periodCount);
            }}
          />
        </Col>

        <Col />

      </Row>
    </>
  );
}

export default YearAndPeriodSelector;