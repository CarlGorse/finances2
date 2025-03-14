import { Button, Col, Container, Row } from 'react-bootstrap';
import NumberSelector from 'components/NumberSelector';
import { range } from 'functions/ArrayFunctions'
import { useState } from 'react';
import YearAndPeriodSelector from './YearAndPeriodSelector'

function ReportBanner({ reportLoadState, onRefresh }) {

    const reportData = useState(null)
    const [reportPeriods, setReportPeriods] = useState(6);

    let refreshButton

    if (reportLoadState === "loaded") {

        refreshButton = <Button
            size="md"
            style={{ marginTop: "20px" }} onClick={() => onRefresh(prevValue => !prevValue)}>
            Refresh
        </Button>
    }

    return (

        <Container style={{ position: "sticky", top: "3em", backgroundColor: "white", zIndex: "1", paddingTop: "1em" }}>
            <YearAndPeriodSelector reportPeriods={reportPeriods} />

            <Row className="mt-3">
                <Col xs={1}>Periods to show:</Col>
                <Col>
                    <NumberSelector
                        defaultValue={6}
                        onSelect={selectedValue => setReportPeriods(selectedValue)}
                        values={range(1, 6)}
                        startPadding={1}
                    />
                </Col>
            </Row>

            {refreshButton}

            <Container className="pt-3 pb-3">

                <Row>
                    <Col />
                    {
                        reportData?.YearsAndPeriods?.map(yearAndPeriod => (

                            <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center" >
                                <b>{yearAndPeriod.Year}.{yearAndPeriod.Period}</b>
                            </Col>
                        ))
                    }
                </Row>

            </Container>
        </Container>
    )
}

export default ReportBanner;