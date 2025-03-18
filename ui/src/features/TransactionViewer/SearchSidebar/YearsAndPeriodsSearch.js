import { Col, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { yearAndPeriodSearchState } from "recoil/atoms/YearAndPeriodSearchState";

import PeriodSelector from "components/PeriodSelector";
import YearSelector from "components/YearSelector";

function YearsAndPeriodsSearch() {
  const [yearAndPeriodSearch, setYearAndPeriodSearch] = useRecoilState(
    yearAndPeriodSearchState,
  );

  function UpdateSelectedStartYearAndPeriod(propertyName, value) {
    setYearAndPeriodSearch((prevState) => ({
      ...prevState,
      [propertyName]: value,
    }));
  }

  function UpdateSelectedEndYearAndPeriod(propertyName, value) {
    setYearAndPeriodSearch((prevState) => ({
      ...prevState,
      [propertyName]: value,
    }));
  }

  return (
    <>
      <Row>
        <Col xs={2}>From:</Col>

        <Col xs={2}>
          <PeriodSelector
            defaultValue={yearAndPeriodSearch?.StartPeriod}
            onSelect={(value) => {
              UpdateSelectedStartYearAndPeriod("StartPeriod", value);

              if (
                value > yearAndPeriodSearch.EndPeriod &&
                yearAndPeriodSearch.EndYear === yearAndPeriodSearch.StartYear
              ) {
                UpdateSelectedEndYearAndPeriod("EndPeriod", value);
              }
            }}
          />
        </Col>

        <Col xs={6}>
          <YearSelector
            defaultValue={yearAndPeriodSearch?.StartYear}
            onSelect={(value) => {
              UpdateSelectedStartYearAndPeriod("StartYear", value);

              if (value > yearAndPeriodSearch.EndYear) {
                UpdateSelectedEndYearAndPeriod("EndYear", value);
              }
            }}
          />
        </Col>
        <Col />
      </Row>

      <Row>
        <Col xs={2}>To:</Col>

        <Col xs={2}>
          <PeriodSelector
            defaultValue={yearAndPeriodSearch?.EndPeriod}
            onSelect={(value) =>
              UpdateSelectedEndYearAndPeriod("EndPeriod", value)
            }
          />
        </Col>

        <Col xs={6}>
          <YearSelector
            defaultValue={yearAndPeriodSearch?.EndYear}
            onSelect={(value) =>
              UpdateSelectedEndYearAndPeriod("EndYear", value)
            }
          />
        </Col>

        <Col />
      </Row>
    </>
  );
}

export default YearsAndPeriodsSearch;
