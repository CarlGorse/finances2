import { Button, Col, Container, Row } from 'react-bootstrap';
import BankAccountSelector from './BankAccountSelector';
import { loadedTransactionsState } from 'recoil/atoms/LoadedTransactionsAtom';
import NavigationButtons from './TransactionList/NavigationButtons'
import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationButtons from './OperationButtons';
import OperationPage from './OperationPage';
import { padStart } from 'functions/NumberFunctions';
import PageSizeSelector from './TransactionList/PageSizeSelector'
import { selectedBankAccountState } from 'recoil/atoms/SelectedBankAccountAtom';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { transactionsPageNoState } from 'recoil/atoms/TransactionsPageNoAtom';
import { useRecoilState } from 'recoil';
import UserMessage from 'components/UserMessage'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import YearsAndPeriodsSearch from './YearsAndPeriodsSearch';
import { yearAndPeriodSearchState } from 'recoil/atoms/YearAndPeriodSearchAtom';
import BankAccount from 'types/BankAccount'
import LoadedTransactions from 'types/LoadedTransactions'
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

export default function TransactionBanner() {
  const loadedTransactions = useRecoilValue<LoadedTransactions>(loadedTransactionsState);
  const selectedBankAccount = useRecoilValue<BankAccount>(selectedBankAccountState);
  const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationState);
  const [transactionPageNo, setTransactionPageNo] = useRecoilState(transactionsPageNoState);
  const [showSearch, setShowSearch] = useState(false);
  const [, setShowOperations] = useState(false);
  const [yearAndPeriodSearch, setYearAndPeriodSearch] = useRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchState);

  useEffect(() => {

    setTransactionPageNo(1);

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    setYearAndPeriodSearch({
      StartPeriod: currentMonth,
      StartYear: currentYear,
      EndPeriod: currentMonth,
      EndYear: currentYear
    });

  }, [setTransactionPageNo, setYearAndPeriodSearch])

  return (
    <Container>
      <Row>

        <Col xs="11">

          <div>
            <Offcanvas show={showSearch} placement="end" onHide={() => setShowSearch(false)} style={{ backgroundColor: "cornsilk" }}
              scroll={true}
              backdrop={false}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <BankAccountSelector />

                <div className="mt-3">
                  <YearsAndPeriodsSearch />
                </div>

                <div className="mt-3">
                  <PageSizeSelector />
                </div>

              </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas
              placement="end"
              show={transactionOperation}
              onHide={
                () => setTransactionOperation(null)
              }
              style={{ backgroundColor: "cornsilk" }}
              scroll={true}
              backdrop={false}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Operation</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <OperationPage />
              </Offcanvas.Body>
            </Offcanvas>

            <div className="mt-3">
              <UserMessage />
            </div>

            <div>
              <div>
                Bank account: <b>{selectedBankAccount?.Name}</b>
              </div>
              <div>
                From <b>
                  {padStart(yearAndPeriodSearch.StartPeriod, 2, '0')}.{yearAndPeriodSearch.StartYear}
                </b>
                {" to "}
                <b>
                  {padStart(yearAndPeriodSearch.EndPeriod, 2, '0')}.{yearAndPeriodSearch.EndYear}
                </b>
              </div>
            </div>

            <div className="mt-3">
              <NavigationButtons
                pageNo={transactionPageNo}
                pageCount={loadedTransactions?.pageCount}
                onClick={pageNo => { setTransactionPageNo(pageNo); }}
              />
            </div>

          </div>

        </Col>

        <Col xs="4">

          <Button size="sm" onClick={() => setShowSearch(true)}>search</Button>

          <OperationButtons onClick={() => setShowOperations(true)} />

        </Col>

      </Row>
    </Container >
  );
}