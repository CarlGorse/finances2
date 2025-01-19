import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { formatCurrency } from 'functions/CurrencyFunctions'
import { isYearAndPeriodSearchValid } from 'functions/YearAndPeriodFunctions'
import ReportBanner from './ReportBanner'
import Spinner from 'components/FinancesSpinner'
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMessageState } from 'recoil/atoms/UserMessageAtom';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';

function Report() {

    const [doRefresh, setDoRefresh] = useState(false)
    const [loadState, setLoadState] = useState("");
    const [reportData, setReportData] = useState(null)
    const setUserMessage = useSetRecoilState(userMessageState);
    const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchState);

    useEffect(() => {

        if (!isYearAndPeriodSearchValid(yearAndPeriodSearch)
        ) {
            return;
        }

        setLoadState("loading");

        axios.post(apiBaseUrl + "/reportTotals/getCategoryTotals", {
            StartYear: yearAndPeriodSearch.StartYear,
            StartPeriod: yearAndPeriodSearch.StartPeriod,
            EndYear: yearAndPeriodSearch.EndYear,
            EndPeriod: yearAndPeriodSearch.EndPeriod,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                setReportData(response.data);

                setLoadState("loaded");
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.errors[0],
                    Variant: "danger"
                })
            })
    }, [yearAndPeriodSearch, setUserMessage, doRefresh])

    let report;
    let spinner

    if (loadState === "") {
        report = <>
        </>
    }

    if (loadState === "loading") {
        spinner =
            <>
                <Spinner />
            </>
    }

    if (loadState === "loaded") {

        report =
            <>
                <Container>
                    {
                        reportData.Groups.map(group => (
                            <div key={group.Id}>
                                {
                                    <>
                                        <div style={{
                                            borderBottom: "1px solid"
                                        }}></div>

                                        <Row key={group.Id} style={{ paddingTop: "10px" }}>
                                            <Col className="tableCell text-center">
                                                <b>{group.Name}</b>
                                            </Col>
                                            {
                                                reportData.YearsAndPeriods.map(yearAndPeriod => (
                                                    <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center">
                                                        <b>
                                                            {formatCurrency(
                                                                reportData.GroupTotals.filter(groupTotal =>
                                                                    groupTotal.GroupId === group.GroupId)[0]?.YearAndPeriodTotals.filter(groupYearAndPeriodTotal =>
                                                                        groupYearAndPeriodTotal.YearAndPeriod.Year === yearAndPeriod.Year
                                                                        && groupYearAndPeriodTotal.YearAndPeriod.Period === yearAndPeriod.Period)[0]?.YTDTotal)
                                                            }
                                                        </b>
                                                    </Col>
                                                ))
                                            }

                                        </Row>

                                        {
                                            reportData.Categories.filter(category => category.GroupId === group.GroupId).map(category =>

                                                <Row key={category.Id}>

                                                    <Col className="tableCell text-center">
                                                        {category.Name}
                                                    </Col>

                                                    {
                                                        reportData.YearsAndPeriods.map(yearAndPeriod => (
                                                            <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center">
                                                                {formatCurrency(
                                                                    reportData.CategoryTotals.filter(categoryTotal =>
                                                                        categoryTotal.CategoryId === category.Id)[0]?.YearAndPeriodTotals.filter(categoryYearAndPeriodTotal =>
                                                                            categoryYearAndPeriodTotal.YearAndPeriod.Year === yearAndPeriod.Year
                                                                            && categoryYearAndPeriodTotal.YearAndPeriod.Period === yearAndPeriod.Period)[0]?.YTDTotal)
                                                                }
                                                            </Col>
                                                        ))
                                                    }

                                                </Row>

                                            )
                                        }
                                    </>
                                }
                            </div>
                        ))
                    }
                </Container>
            </>
    }

    return (
        <>
            <Container>

                <ReportBanner reportLoadState={loadState} onRefresh={() => setDoRefresh(prevValue => !prevValue)} />

                {spinner}

                {report}

            </Container>
        </>
    )
}

export default Report;