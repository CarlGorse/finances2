import axios from "axios";
import Spinner from "components/FinancesSpinner";
import Layout from "components/Layout";
import { formatCurrency } from "functions/CurrencyFunctions";
import { isYearAndPeriodSearchValid } from "functions/YearAndPeriodFunctions";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageState } from "recoil/atoms/UserMessageState";
import { yearAndPeriodSearchState } from "recoil/atoms/YearAndPeriodSearchState";
import YearAndPeriod from "types/YearAndPeriod";
import ReportBanner from "./ReportBanner";

function Report() {
  const [doRefresh, setDoRefresh] = useState(false);
  const [loadState, setLoadState] = useState("");
  const [reportData, setReportData] = useState(null);
  const [valueCalculatorType, setValueCalculatorType] = useState(0);
  const [totalCalculatorType, setTotalCalculatorType] = useState(1);
  const setUserMessage = useSetRecoilState(userMessageState);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchState);

  useEffect(() => {
    if (!isYearAndPeriodSearchValid(yearAndPeriodSearch)) {
      return;
    }

    setLoadState("loading");

    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/reportTotals/getCategoryTotals",
        {
          yearAndPeriodSearch: {
            StartYear: yearAndPeriodSearch.StartYear,
            StartPeriod: yearAndPeriodSearch.StartPeriod,
            EndYear: yearAndPeriodSearch.EndYear,
            EndPeriod: yearAndPeriodSearch.EndPeriod,
          },
          valueCalculatorType: valueCalculatorType,
          totalCalculatorType: totalCalculatorType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        setReportData(response.data);

        setLoadState("loaded");
      })
      .catch(function (error) {
        setUserMessage({
          Message: error.response.data.errors[0],
          Variant: "danger",
        });
      });
  }, [
    yearAndPeriodSearch,
    setUserMessage,
    doRefresh,
    valueCalculatorType,
    totalCalculatorType,
  ]);

  let report;
  let spinner;

  if (loadState === "") {
    report = <></>;
  }

  if (loadState === "loading") {
    spinner = (
      <>
        <Spinner />
      </>
    );
  }

  function isCurrentYearAndPeriod(yearAndPeriod: YearAndPeriod) {
    return (
      yearAndPeriod.Year == new Date().getFullYear() &&
      yearAndPeriod.Period == new Date().getMonth() + 1
    );
  }

  if (loadState === "loaded") {
    report = (
      <div>
        <div className="d-flex flex-row col-10 justify-content-center">
          <div className="d-flex flex-column col-6"></div>
          {reportData.YearsAndPeriods.map((yearAndPeriod) => (
            <div
              className="d-flex flex-column col-1"
              style={{
                backgroundColor: isCurrentYearAndPeriod(yearAndPeriod)
                  ? "paleturquoise"
                  : "",
              }}
            >
              <b>{`${yearAndPeriod.Year.toString().padStart(4, "0")}.${yearAndPeriod.Period.toString().padStart(2, "0")}`}</b>
            </div>
          ))}
        </div>

        {reportData.Groups.map((group) => (
          <div>
            <div
              key={group.Id}
              className={`d-flex flex-row col-10 justify-content-center`}
              style={{ paddingTop: "10px", borderTop: "1px solid" }}
            >
              <div className="d-flex flex-column col-6">
                <b>{group.Name}</b>
              </div>
              {reportData.YearsAndPeriods.map((yearAndPeriod) => (
                <div
                  className="d-flex flex-column col-1"
                  key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`}
                  style={{
                    backgroundColor: isCurrentYearAndPeriod(yearAndPeriod)
                      ? "paleturquoise"
                      : "",
                  }}
                >
                  <b>
                    {formatCurrency(
                      reportData.GroupTotals.filter(
                        (groupTotal) => groupTotal.GroupId === group.GroupId,
                      )[0]?.YearAndPeriodTotals.filter(
                        (groupYearAndPeriodTotal) =>
                          groupYearAndPeriodTotal.YearAndPeriod.Year ===
                          yearAndPeriod.Year &&
                          groupYearAndPeriodTotal.YearAndPeriod.Period ===
                          yearAndPeriod.Period,
                      )[0]?.Total,
                    )}
                  </b>
                </div>
              ))}
            </div>
            {reportData.Categories.filter(
              (category) => category.GroupId === group.GroupId,
            ).map((category) => (
              <div
                className="d-flex flex-row justify-content-center col-10"
                key={category.Id}
              >
                <div className="d-flex flex-column col-6">{category.Name}</div>

                {reportData.YearsAndPeriods.map((yearAndPeriod) => (
                  <div
                    className="d-flex flex-column col-1"
                    key={`${yearAndPeriod.Year}.${yearAndPeriod.Period}`}
                    style={{
                      backgroundColor: isCurrentYearAndPeriod(yearAndPeriod)
                        ? "paleturquoise"
                        : "",
                    }}
                  >
                    {formatCurrency(
                      reportData.CategoryTotals.filter(
                        (categoryTotal) =>
                          categoryTotal.CategoryId === category.Id,
                      )[0]?.YearAndPeriodTotals.filter(
                        (categoryYearAndPeriodTotal) =>
                          categoryYearAndPeriodTotal.YearAndPeriod.Year ===
                          yearAndPeriod.Year &&
                          categoryYearAndPeriodTotal.YearAndPeriod.Period ===
                          yearAndPeriod.Period,
                      )[0]?.Total,
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Layout title="Category totals report">
      <ReportBanner
        reportLoadState={loadState}
        onRefresh={() => setDoRefresh((prevValue) => !prevValue)}
        onSelectValueCalculatorType={(e) => setValueCalculatorType(e)}
        onSelectTotalCalculatorType={(e) => setTotalCalculatorType(e)}
      />

      {spinner}

      {report}
    </Layout>
  );
}

export default Report;
