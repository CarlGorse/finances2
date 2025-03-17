import PeriodsToShowSelector from "./ReportBanner/PeriodsToShowSelector";
import TotalCalculatorTypeSelector from "./ReportBanner/TotalCalculatorTypeSelector";
import ValueCalculatorTypeSelector from "./ReportBanner/ValueCalculatorTypeSelector";
import YearAndPeriodSelector from "./ReportBanner/YearAndPeriodSelector";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function ReportBanner({
  reportLoadState,
  onRefresh,
  onSelectValueCalculatorType,
  onSelectTotalCalculatorType,
}) {
  const reportData = useState(null);
  const [reportPeriods, setReportPeriods] = useState(6);

  let refreshButton;

  if (reportLoadState === "loaded") {
    refreshButton = (
      <Button
        size="md"
        style={{ marginTop: "20px" }}
        onClick={() => onRefresh((prevValue) => !prevValue)}
      >
        Refresh
      </Button>
    );
  }

  return (
    <Container
      style={{
        position: "sticky",
        top: "3em",
        backgroundColor: "white",
        zIndex: "1",
        paddingTop: "1em",
      }}
    >
      <YearAndPeriodSelector reportPeriods={reportPeriods} />

      <div className="mt-1">
        <PeriodsToShowSelector
          onSelect={(selectedValue) => setReportPeriods(selectedValue)}
        />
      </div>

      <div className="mt-1">
        <ValueCalculatorTypeSelector
          onSelect={(selection) => onSelectValueCalculatorType(selection)}
        />
      </div>

      <div className="mt-1">
        <TotalCalculatorTypeSelector
          onSelect={(selection) => onSelectTotalCalculatorType(selection)}
        />
      </div>

      {refreshButton}

      <Container className="pt-3 pb-3">
        <Row>
          <Col />
          {reportData?.YearsAndPeriods?.map((yearAndPeriod) => (
            <Col
              key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`}
              className="tableCell text-center"
            >
              <b>
                {yearAndPeriod.Year}.{yearAndPeriod.Period}
              </b>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default ReportBanner;
