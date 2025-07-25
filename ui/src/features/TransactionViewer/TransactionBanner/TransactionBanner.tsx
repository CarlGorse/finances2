import OperationButtons from "./OperationButtons";
import PagingButtons from "./PagingButtons";
import SearchCriteria from "./SearchCriteria";
import SearchSidebar from "./SearchSidebar";
import OperationSidebar from "features/TransactionViewer/OperationsSidebar/OperationsSidebar";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { transactionOperationState } from "recoil/atoms/TransactionOperationState";
import { yearAndPeriodSearchState } from "recoil/atoms/YearAndPeriodSearchState";
import YearAndPeriodSearch from "types/YearAndPeriodSearch";

import UserMessage from "components/UserMessage";

export default function TransactionBanner() {
  const [showOperationsSidebar, setShowOperationsSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const transactionOperation = useRecoilValue(transactionOperationState);

  const setYearAndPeriodSearch = useSetRecoilState<YearAndPeriodSearch>(
    yearAndPeriodSearchState,
  );

  useEffect(() => {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    setYearAndPeriodSearch({
      StartPeriod: currentMonth,
      StartYear: currentYear,
      EndPeriod: currentMonth,
      EndYear: currentYear,
    });
  }, [setYearAndPeriodSearch]);

  useEffect(() => {
    if (transactionOperation) {
      setShowOperationsSidebar(true);
    } else {
      setShowOperationsSidebar(false);
    }
  }, [transactionOperation]);

  return (
    <>
      <SearchSidebar show={showSearchSidebar} setShow={setShowSearchSidebar} />

      <OperationSidebar
        show={showOperationsSidebar}
        setShow={setShowOperationsSidebar}
      />

      <Container>
        <Row>
          <div className="mt-3">
            <UserMessage />
          </div>

          <SearchCriteria />

          <PagingButtons />

          <Col xs="4">
            <Button
              size="sm"
              onClick={() => setShowSearchSidebar(!showSearchSidebar)}
            >
              Search
            </Button>

            <OperationButtons
              setShowOperationsSidebar={setShowOperationsSidebar}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
