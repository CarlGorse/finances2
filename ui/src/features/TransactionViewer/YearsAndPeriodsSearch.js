import { Col, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import YearAndPeriodSelect from 'components/YearAndPeriodSelect'
import { periods, years } from 'consts/YearAndPeriodConsts'

function YearsAndPeriodsSearch() {

  const [yearAndPeriodSearch, setYearAndPeriodSearch] = useRecoilState(yearAndPeriodSearchState);

  function UpdateSelectedStartYearAndPeriod(propertyName, value) {
    setYearAndPeriodSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  function UpdateSelectedEndYearAndPeriod(propertyName, value) {
    setYearAndPeriodSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  return (
    <>
      <Row>

        <Col xs={2}>From:</Col>

        <Col xs={2}>
          <YearAndPeriodSelect
            defaultValue={yearAndPeriodSearch?.StartPeriod}
            onSelect={
              value => {
                UpdateSelectedStartYearAndPeriod("StartPeriod", value)

                if ((value > yearAndPeriodSearch.EndPeriod) && (yearAndPeriodSearch.EndYear === yearAndPeriodSearch.StartYear)) {
                  UpdateSelectedEndYearAndPeriod("EndPeriod", value)
                }
              }
            }
            values={periods} />
        </Col>

        <Col xs={6}>
          <YearAndPeriodSelect
            defaultValue={yearAndPeriodSearch?.StartYear}
            onSelect={
              value => {
                UpdateSelectedStartYearAndPeriod("StartYear", value)

                if (value > yearAndPeriodSearch.EndYear) {
                  UpdateSelectedEndYearAndPeriod("EndYear", value)
                }
              }
            }
            values={years} />
        </Col>
        <Col />
      </Row>

      <Row>

        <Col xs={2}>To:</Col>

        <Col xs={2}>
          <YearAndPeriodSelect
            defaultValue={yearAndPeriodSearch?.EndPeriod}
            onSelect={value => UpdateSelectedEndYearAndPeriod("EndPeriod", value)}
            values={periods} />
        </Col>

        <Col xs={6}>
          <YearAndPeriodSelect
            defaultValue={yearAndPeriodSearch?.EndYear}
            onSelect={value => UpdateSelectedEndYearAndPeriod("EndYear", value)}
            values={years} />
        </Col>

        <Col />
      </Row>
    </>
  );
}

export default YearsAndPeriodsSearch;