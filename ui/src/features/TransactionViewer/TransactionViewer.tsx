import { Button, Col, Container, Row } from 'react-bootstrap';
import BankAccountSelector from './BankAccountSelector';
import { loadedTransactionsAtom } from 'common/recoil/atoms/LoadedTransactionsAtom';
import NavigationButtons from './TransactionList/NavigationButtons'
import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationButtons from './OperationButtons';
import OperationPage from './OperationPage';
import { padStart } from 'common/functions/NumberFunctions';
import PageSizeInput from './TransactionList/PageSizeInput'
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import TransactionList from './TransactionList';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { transactionsPageNoAtom } from 'common/recoil/atoms/TransactionsPageNoAtom';
import { useRecoilState } from 'recoil';
import UserMessage from 'common/components/UserMessage'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import YearsAndPeriodsSearch from './YearsAndPeriodsSearch';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';
import BankAccount from 'types/BankAccount'
import LoadedTransactions from 'types/LoadedTransactions'
import YearAndPeriodSearch from 'types/YearAndPeriodSearch'

function TransactionViewer() {

  const loadedTransactions = useRecoilValue<LoadedTransactions>(loadedTransactionsAtom);
  const selectedBankAccount = useRecoilValue<BankAccount>(selectedBankAccountAtom);
  const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
  const [transactionPageNo, setTransactionPageNo] = useRecoilState(transactionsPageNoAtom);
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [yearAndPeriodSearch, setYearAndPeriodSearch] = useRecoilState<YearAndPeriodSearch>(yearAndPeriodSearchAtom);

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

  useEffect(() => {
    if (transactionOperation) {
      setShow(true);
    }
  }, [transactionOperation])

  return (
    <Container>
      <Row>
        <Col xs="11">

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
                <PageSizeInput />
              </div>

            </Offcanvas.Body>
          </Offcanvas>

          <Offcanvas placement="end" show={showOperations} onHide={() => setShowOperations(false)} style={{ backgroundColor: "cornsilk" }}
            scroll={true}
            backdrop={false}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Operations</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <OperationButtons />
              <OperationPage show={show} handleClose={() => { setShow(false); setTransactionOperation(null); }} />
            </Offcanvas.Body>
          </Offcanvas>



          <div className="mt-3">
            <UserMessage />
          </div>

          <div>
            <div>
              Bank account: <b>{selectedBankAccount.Name}</b>
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

          <div className="mt-3">
            <TransactionList />
          </div>

        </Col>
        <Col xs="1">
          <div>
            <Button onClick={() => setShowSearch(true)}>Search</Button>
          </div>
          <div className="mt-1">
            <Button onClick={() => setShowOperations(true)}>Operations</Button>
          </div>

        </Col>
      </Row>
    </Container >
  );
}

export default TransactionViewer;