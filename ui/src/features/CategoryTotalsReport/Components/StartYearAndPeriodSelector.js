import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import DropdownFilter from 'components/DropdownFilter'
import { selectedYearAndPeriodAtom } from 'recoil/atoms/SelectedYearAndPeriodAtom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react';

function StartYearAndPeriodSelector() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const selectedYearAndPeriod = useRecoilValue(selectedYearAndPeriodAtom);
  const setSelectedYearAndPeriod = useSetRecoilState(selectedYearAndPeriodAtom);
  const years = ["2023", "2024"]
  const reportPeriodsToShow = 6;

  function UpdateEndYearAndPeriod(startYear, startPeriod) {
    let startYearPeriod = (Number(startYear) * 12) + Number(startPeriod);
    let endYearPeriod = Number(startYearPeriod) + (reportPeriodsToShow - 1);
    let endYear = Math.floor(endYearPeriod / 12);
    let endPeriod = endYearPeriod - (endYear * 12);

    UpdateSelectedYearAndPeriod("EndPeriod", endPeriod);
    UpdateSelectedYearAndPeriod("EndYear", endYear);
  }

  function UpdateSelectedYearAndPeriod(propertyName, value) {
    setSelectedYearAndPeriod(prevState => ({ ...prevState, [propertyName]: value }))
  }

  useEffect(() => {
    setSelectedYearAndPeriod({
      StartYear: 2024,
      EndYear: 2024,
      StartPeriod: 3,
      EndPeriod: 8
    });
  }, [])

  if (!selectedYearAndPeriod) {
    return;
  }

  return (
    <>
    
      <Button size="sm" onClick={() => UpdateSelectedYearAndPeriod("StartPeriod", selectedYearAndPeriod.StartPeriod - 1)}>{"<"}</Button>
      
      <Button size="sm" style={{marginLeft: "1px"}} onClick={() => UpdateSelectedYearAndPeriod("StartPeriod", selectedYearAndPeriod.StartPeriod + 1)}>{">"}</Button>

      <Row>
        <Col xs={1}>From:</Col>
        <Col xs={1}>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod?.StartPeriod}
            onSelect={value => {
              UpdateEndYearAndPeriod(selectedYearAndPeriod.StartYear, value);
              UpdateSelectedYearAndPeriod("StartPeriod", value);
            }}
            values={periods} />
        </Col>
        <Col>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod?.StartYear}
            onSelect={value => {
              UpdateEndYearAndPeriod(value, selectedYearAndPeriod.StartPeriod);
              UpdateSelectedYearAndPeriod("StartYear", value);
            }}
            values={years} />
        </Col>
        <Col />
      </Row>
    </>
  );
}

export default StartYearAndPeriodSelector;