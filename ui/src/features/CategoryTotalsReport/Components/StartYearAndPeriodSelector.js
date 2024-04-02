import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import DropdownFilter from 'components/DropdownFilter'
import { selectedYearAndPeriodAtom } from 'recoil/atoms/SelectedYearAndPeriodAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from 'react';

function StartYearAndPeriodSelector() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const selectedYearAndPeriod = useRecoilValue(selectedYearAndPeriodAtom);
  const setSelectedYearAndPeriod = useSetRecoilState(selectedYearAndPeriodAtom);
  const years = ["2023", "2024"]
  const reportPeriodsToShow = 6;
  const [startYearAndPeriodCount, setStartYearAndPeriodCount] = useState((null));

useEffect(() => {
  let today = new Date();
  let year = (today.getFullYear() * 12);
  let periods = today.getMonth() + 1;
  let yearAndPeriodCount = year + periods;
  setStartYearAndPeriodCount(yearAndPeriodCount);
}, []);

  useEffect(() => {
    
    let startYearAndPeriod = GetYearAndPeriodFromPeriodCount(startYearAndPeriodCount);
    let endYearAndPeriod = GetYearAndPeriodFromPeriodCount(startYearAndPeriodCount + (reportPeriodsToShow - 1));

    setSelectedYearAndPeriod({
      StartYear: startYearAndPeriod.Year,
      StartPeriod: startYearAndPeriod.Period,
      EndYear: endYearAndPeriod.Year,
      EndPeriod: endYearAndPeriod.Period
    });
  }, [startYearAndPeriodCount])

  function GetYearAndPeriodFromPeriodCount(periodCount) {    
    let year = Math.floor((periodCount - 1) / 12);
    let period = periodCount - (year * 12);

    return {Year: year, Period: period};
  }

  function SetStartYearAndPeriodCountFromYearAndPeriod(year, period) {
    let periodCount = GetPeriodCountFromYearAndPeriod(year, period);
    setStartYearAndPeriodCount(periodCount);
  }

  function GetPeriodCountFromYearAndPeriod(year, period) {
    return (year * 12) + period;
  }

  if (!selectedYearAndPeriod) {
    return;
  }

  return (
    <>
    
      <Button size="sm" onClick={() => 
        {
          setStartYearAndPeriodCount(prevValue => prevValue - 1);
        }}
      >{"<"}</Button>
      
      <Button size="sm" style={{marginLeft: "1px"}} onClick={() => 
        {
          setStartYearAndPeriodCount(prevValue => prevValue + 1);
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