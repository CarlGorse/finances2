import { Col, Row } from 'react-bootstrap';
import DropdownFilter from '../../../components/DropdownFilter'
import { selectedStartYearAndPeriodAtom } from 'recoil/atoms/SelectedStartYearAndPeriodAtom';
import { selectedYearAndPeriodAtom } from 'recoil/atoms/SelectedYearAndPeriodAtom';
import { useRecoilState, useSetRecoilState } from "recoil";

function YearAndPeriodSelector() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const [selectedYearAndPeriod, setSelectedYearAndPeriod] = useRecoilState(selectedYearAndPeriodAtom);
  const setSelectedStartYearAndPeriod = useSetRecoilState(selectedStartYearAndPeriodAtom);
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"]

  function UpdateSelectedStartYearAndPeriod(propertyName, value) {
    setSelectedStartYearAndPeriod(prevState => ({ ...prevState, [propertyName]: value }))
  }

  function UpdateSelectedEndYearAndPeriod(propertyName, value) {
    setSelectedYearAndPeriod(prevState => ({ ...prevState, [propertyName]: value }))
  }

  return (
    <>
      <Row>
        <Col xs={1}>From:</Col>
        <Col xs={1}>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod?.StartPeriod}
            onSelect={value => UpdateSelectedStartYearAndPeriod("StartPeriod", value)}
            values={periods} />
        </Col>
        <Col>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod?.StartYear}
            onSelect={value => UpdateSelectedStartYearAndPeriod("StartYear", value)}
            values={years} />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col xs={1}>To:</Col>
        <Col xs={1}>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod?.EndPeriod}
            onSelect={value => UpdateSelectedEndYearAndPeriod("EndPeriod", value)}
            values={periods} />
        </Col>
        <Col>
          <DropdownFilter
            defaultValue={selectedYearAndPeriod?.EndYear}
            onSelect={value => UpdateSelectedEndYearAndPeriod("EndYear", value)}
            values={years} />
        </Col>
        <Col />
      </Row>
    </>
  );
}

export default YearAndPeriodSelector;