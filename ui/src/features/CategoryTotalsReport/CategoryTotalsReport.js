import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { formatCurrency } from 'common/functions/CurrencyFunctions'
import { isYearAndPeriodSearchValid } from 'common/functions/YearAndPeriodFunctions'
import Spinner from 'common/components/Spinner'
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import StartYearAndPeriodSelector from './StartYearAndPeriodSelector'

function CategoryTotalsReport() {

    const [reportData, setReportData] = useState(null)
    const [doRefresh, setDoRefresh] = useState(false)
    const [loadState, setLoadState] = useState("");
    const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);

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
    let refreshButton
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

        refreshButton = <Button
            size="md"
            style={{ marginTop: "20px" }} onClick={() => setDoRefresh(prevValue => !prevValue)}>
            Refresh
        </Button>

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
                <Container style={{ position: "sticky", top: "3em", backgroundColor: "white", zIndex: "1", paddingTop: "1em" }}>
                    <StartYearAndPeriodSelector />

                    {refreshButton}

                    <Container className="pt-3 pb-3">

                        <Row>
                            <Col />
                            {
                                reportData?.YearsAndPeriods.map(yearAndPeriod => (

                                    <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center" >
                                        <b>{yearAndPeriod.Year}.{yearAndPeriod.Period}</b>
                                    </Col>
                                ))
                            }
                        </Row>

                    </Container>
                </Container>

                {spinner}

                {report}

            </Container>
        </>
    )
}

export default CategoryTotalsReport;