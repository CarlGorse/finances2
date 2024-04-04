import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { formatCurrency } from 'functions/CurrencyFunctions'
import { selectedBankAccountAtom } from "recoil/atoms/SelectedBankAccountAtom";
import { selectedYearAndPeriodAtom } from "recoil/atoms/SelectedYearAndPeriodAtom";
import Spinner from 'components/Spinner'
import StartYearAndPeriodSelector from './Components/StartYearAndPeriodSelector'
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function CategoryTotalsReport() {

    const [categoryTotalsReport, setCategoryTotalsReport] = useState(null)
    const [doRefresh, setDoRefresh] = useState(false)
    const [loading, setLoading] = useState(null);
    const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);
    const selectedYearAndPeriod = useRecoilValue(selectedYearAndPeriodAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);

    useEffect(() => {

        if (!_isSearchCriteriaValid(selectedYearAndPeriodAtom)
        ) {
            return () => { };
        }

        setLoading(true);

        axios.post(apiBaseUrl + "/reportTotals/getCategoryTotals", {
            AccountId: selectedBankAccount.AccountId,
            StartYear: selectedYearAndPeriod.StartYear,
            StartPeriod: selectedYearAndPeriod.StartPeriod,
            EndYear: selectedYearAndPeriod.EndYear,
            EndPeriod: selectedYearAndPeriod.EndPeriod,
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
    }, [selectedYearAndPeriod, setUserMessage, doRefresh])

    function _isSearchCriteriaValid(transactionSearch) {
        return transactionSearch.StartPeriod !== null
            || transactionSearch.StartYear !== null
            || transactionSearch.EndPeriod !== null
            || transactionSearch.EndYear !== null
    }

    if (!categoryTotalsReport) {
        return null;
    }

    return (
        <Container>

            <StartYearAndPeriodSelector />

            {loading && <Spinner />}

            {!loading &&
                <Table>

                    <Row>
                        <Col />
                        {
                            categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (

                                <Col className="tableCell text-center">
                                    <b>{yearAndPeriod.Year}.{yearAndPeriod.Period}</b>
                                </Col>
                            ))
                        }
                    </Row>
                    <Button size="md" style={{ marginTop: "20px" }} onClick={() => setDoRefresh(prevValue => !prevValue)}>Refresh</Button>

                    <Row>
                        {/*
                        <Col>Total:</Col>
                        {
                            categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (

                                <Col className="tableCell text-center">
                                    {formatCurrency(categoryTotalsReport.YearAndPeriodTotals.filter(yearAndPeriodTotal =>
                                        yearAndPeriodTotal.YearAndPeriod.Year === yearAndPeriod.Year
                                        && yearAndPeriodTotal.YearAndPeriod.Period === yearAndPeriod.Period
                                    )[0]?.YTDTotal)}
                                </Col>
                            ))
                        }
                    </Row>
                    */}

                    {
                        categoryTotalsReport.Groups.map(group => (
                            <>
                                {
                                    <>
                                        <div style={{
                                            borderBottom: "1px solid"
                                        }}></div>

                                        <Row style={{ paddingTop: "10px" }}>
                                            <Col className="tableCell text-center">
                                                <b>{group.Name}</b>
                                            </Col>
                                            {
                                                categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (
                                                    <Col className="tableCell text-center">
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
                                            categoryTotalsReport.Categories.filter(category => category.GroupId === group.GroupId).map(category => (

                                                <Row key={category.Id}>

                                                    <Col className="tableCell text-center">
                                                        {category.Name}
                                                    </Col>

                                                    {
                                                        categoryTotalsReport.YearsAndPeriods.map(yearAndPeriod => (
                                                            <Col className="tableCell text-center">
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
                                            ))
                                        }
                                    </>
                                }
                            </>
                        ))
                    }
                </Table>
            }

        </Container>
    )
}

export default CategoryTotalsReport;