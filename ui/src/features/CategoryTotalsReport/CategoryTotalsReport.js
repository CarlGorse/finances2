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

    const [categoryTotalsReport, setCategoryTotalsReport] = useState(null)
    const [doRefresh, setDoRefresh] = useState(false)
    const [loading, setLoading] = useState(null);
    const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);

    useEffect(() => {

        if (!isYearAndPeriodSearchValid(yearAndPeriodSearch)
        ) {
            return () => { };
        }

        setLoading(true);

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
                setCategoryTotalsReport(response.data);

                setLoading(false);
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.errors[0],
                    Variant: "danger"
                })
            })
    }, [yearAndPeriodSearch, setUserMessage, doRefresh])

    if (!categoryTotalsReport) {
        return null;
    }

    return (

        <Container>

            <StartYearAndPeriodSelector />

            {loading && <Spinner />}

            {!loading &&

                <>

                    <Button size="md" style={{ marginTop: "20px" }} onClick={() => setDoRefresh(prevValue => !prevValue)}>Refresh</Button>

                    <Container style={{ marginTop: "20px" }}>

                        <Row>
                            <Col />
                            {
                                categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (

                                    <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center" >
                                        <b>{yearAndPeriod.Year}.{yearAndPeriod.Period}</b>
                                    </Col>
                                ))
                            }
                        </Row>

                        {
                            categoryTotalsReport.Groups.map(group => (
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
                                                    categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (
                                                        <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center">
                                                            <b>
                                                                {formatCurrency(
                                                                    categoryTotalsReport.GroupTotals.filter(groupTotal =>
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
                                                categoryTotalsReport.Categories.filter(category => category.GroupId === group.GroupId).map(category =>

                                                    <Row key={category.Id}>

                                                        <Col className="tableCell text-center">
                                                            {category.Name}
                                                        </Col>

                                                        {
                                                            categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (
                                                                <Col key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`} className="tableCell text-center">
                                                                    {formatCurrency(
                                                                        categoryTotalsReport.CategoryTotals.filter(categoryTotal =>
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

        </Container >
    )
}

export default CategoryTotalsReport;