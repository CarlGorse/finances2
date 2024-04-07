import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { getYearAndPeriodCountFromDate, getYearsAndPeriodsFromPeriodCount, getPeriodCountFromYearsAndPeriods } from 'common/functions/YearAndPeriodFunctions';
import { reportPeriodsToShow } from 'common/consts/ReportConsts'
import StartPeriodSelector from './PeriodSelector'
import StartYearSelector from './YearSelector'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';

function StartYearAndPeriodSelector() {

  const [selectedYearAndPeriod, setSelectedYearAndPeriod] = useRecoilState(yearAndPeriodSearchAtom);
  const [yearAndPeriodCount, setYearAndPeriodCount] = useState((2024 * 12) + 4);

  useEffect(() => {
    setYearAndPeriodCount(getYearAndPeriodCountFromDate(new Date()));
  }, []);

  useEffect(() => {

    let startYearAndPeriod = getYearsAndPeriodsFromPeriodCount(yearAndPeriodCount);
    let endYearAndPeriod = getYearsAndPeriodsFromPeriodCount(yearAndPeriodCount + (reportPeriodsToShow - 1));

    setSelectedYearAndPeriod({
      StartYear: startYearAndPeriod.Year,
      StartPeriod: startYearAndPeriod.Period,
      EndYear: endYearAndPeriod.Year,
      EndPeriod: endYearAndPeriod.Period
    });
  }, [setSelectedYearAndPeriod, yearAndPeriodCount])

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
          <StartPeriodSelector
            onSelect={value => {
              let periodCount = getPeriodCountFromYearsAndPeriods(selectedYearAndPeriod.StartYear, Number(value));
              setYearAndPeriodCount(periodCount);
            }}
          />
        </Col>

        <Col>
          <StartYearSelector
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

export default StartYearAndPeriodSelector;