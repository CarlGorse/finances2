import {
  getPeriodCountFromYearsAndPeriods,
  getYearAndPeriodCountFromDate,
  getYearsAndPeriodsFromPeriodCount,
} from "functions/YearAndPeriodFunctions";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { yearAndPeriodSearchState } from "recoil/atoms/YearAndPeriodSearchState";

import PeriodSelector from "../PeriodSelector";
import YearSelector from "../YearSelector";

function YearAndPeriodSelector({ reportPeriods }) {
  const [selectedYearAndPeriod, setSelectedYearAndPeriod] = useRecoilState(
    yearAndPeriodSearchState,
  );
  const [yearAndPeriodCount, setYearAndPeriodCount] = useState(2024 * 12 + 4);

  useEffect(() => {
    setYearAndPeriodCount(getYearAndPeriodCountFromDate(new Date()));
  }, []);

  useEffect(() => {
    let startYearAndPeriod =
      getYearsAndPeriodsFromPeriodCount(yearAndPeriodCount);
    let endYearAndPeriod = getYearsAndPeriodsFromPeriodCount(
      yearAndPeriodCount + (reportPeriods - 1),
    );

    setSelectedYearAndPeriod({
      StartYear: startYearAndPeriod.Year,
      StartPeriod: startYearAndPeriod.Period,
      EndYear: endYearAndPeriod.Year,
      EndPeriod: endYearAndPeriod.Period,
    });
  }, [setSelectedYearAndPeriod, yearAndPeriodCount, reportPeriods]);

  if (!selectedYearAndPeriod) {
    return;
  }

  return (
    <div>
      <Button
        size="sm"
        onClick={() => {
          setYearAndPeriodCount((prevValue) => prevValue - 1);
        }}
      >
        {"<"}
      </Button>

      <Button
        size="sm"
        style={{ marginLeft: "1px" }}
        onClick={() => {
          setYearAndPeriodCount((prevValue) => prevValue + 1);
        }}
      >
        {">"}
      </Button>

      <div className="d-flex flex-row col-5" style={{ marginTop: "20px" }}>
        <div className="d-flex col-3" xs={1}>
          From:
        </div>

        <div className="d-flex col-1" xs={1}>
          <div>
            <PeriodSelector
              onSelect={(value) => {
                let periodCount = getPeriodCountFromYearsAndPeriods(
                  selectedYearAndPeriod.StartYear,
                  Number(value),
                );
                setYearAndPeriodCount(periodCount);
              }}
            />
          </div>
          <div className="ms-1">
            <YearSelector
              onSelect={(value) => {
                let periodCount = getPeriodCountFromYearsAndPeriods(
                  Number(value),
                  selectedYearAndPeriod.StartPeriod,
                );
                setYearAndPeriodCount(periodCount);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YearAndPeriodSelector;
