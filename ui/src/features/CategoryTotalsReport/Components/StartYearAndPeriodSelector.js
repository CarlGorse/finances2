import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import DropdownFilter from 'components/DropdownFilter'
import {getYearsAndPeriodsFromPeriodCount, getPeriodCountFromYearsAndPeriods} from 'functions/YearsAndPeriodsFunctions';
import { selectedYearAndPeriodAtom } from 'recoil/atoms/SelectedYearAndPeriodAtom';
import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";

function StartYearAndPeriodSelector() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const reportPeriodsToShow = 6;
  const [selectedYearAndPeriod, setSelectedYearAndPeriod] = useRecoilState(selectedYearAndPeriodAtom);
  const [yearAndPeriodCount, setYearAndPeriodCount] = useState((2024 * 12) + 4);
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"]

  useEffect(() => {
    let today = new Date();
    let year = (today.getFullYear() * 12);
    let periods = today.getMonth() + 1;
    let yearAndPeriodCount = year + periods;
    setYearAndPeriodCount(yearAndPeriodCount);
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
  }, [yearAndPeriodCount])

  function SetStartYearAndPeriodCountFromYearAndPeriod(year, period) {
    let periodCount = getPeriodCountFromYearsAndPeriods(year, period);
    setYearAndPeriodCount(periodCount);
  }

  if (!selectedYearAndPeriod) {
    return;
  }

  return (
    <>

      <Button size="sm" onClick={() => {
        setYearAndPeriodCount(prevValue => prevValue - 1);
      }}
      >{"<"}</Button>

      <Button size="sm" style={{ marginLeft: "1px" }} onClick={() => {
        setYearAndPeriodCount(prevValue => prevValue + 1);
      }}
      >{">"}</Button>

      <Row>
        <Col xs={1}>From:</Col>
        <Col xs={1}>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod.StartPeriod}
            onSelect={value => {
              SetStartYearAndPeriodCountFromYearAndPeriod(selectedYearAndPeriod.StartYear, Number(value));
            }}
            values={periods} />
        </Col>
        <Col>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod.StartYear}
            onSelect={value => {
              SetStartYearAndPeriodCountFromYearAndPeriod(Number(value), selectedYearAndPeriod.StartPeriod);
            }}
            values={years} />
        </Col>
        <Col />
      </Row>
    </>
  );
}

export default StartYearAndPeriodSelector;