import Accordion from 'react-bootstrap/Accordion';
import BankAccountSelector from './BankAccountSelector';
import OperationButtons from './OperationButtons';
import OperationPage from './OperationPage';
import { padStart } from 'common/functions/NumberFunctions';
import { selectedBankAccountAtom } from 'common/recoil/atoms/SelectedBankAccountAtom';
import TransactionList from './TransactionList';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';
import UserMessage from 'common/components/UserMessage'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import YearsAndPeriodsSearch from './YearsAndPeriodsSearch';
import { yearAndPeriodSearchAtom } from 'common/recoil/atoms/YearAndPeriodSearchAtom';

function TransactionViewer() {

  const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);
  const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
  const [show, setShow] = useState(false);
  const yearAndPeriodSearch = useRecoilValue(yearAndPeriodSearchAtom);

  useEffect(() => {
    if (transactionOperation) {
      setShow(true);
    }
  }, [transactionOperation])

  return (

    <Accordion>

      <div style={{ marginLeft: "20px" }}>
        <BankAccountSelector />
      </div>

      <div style={{ marginTop: "20px" }}>
        <UserMessage />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Search transactions: <b>
              {padStart(yearAndPeriodSearch.StartPeriod, 2, '0')}.{yearAndPeriodSearch.StartYear}
            </b>
            {" to "}
            <b>
              {padStart(yearAndPeriodSearch.EndPeriod, 2, '0')}.{yearAndPeriodSearch.EndYear}
            </b>
          </Accordion.Header>
          <Accordion.Body>
            <YearsAndPeriodsSearch />
          </Accordion.Body>
        </Accordion.Item>
      </div>

      <Accordion.Item eventKey="3">
        <Accordion.Header>
          Operations
        </Accordion.Header>
        <Accordion.Body>

          <OperationButtons />

          <OperationPage show={show} handleClose={() => { setShow(false); setTransactionOperation(null); }} />

        </Accordion.Body>
      </Accordion.Item>

      <div style={{ marginTop: "20px" }}>
        <TransactionList />
      </div>

    </Accordion >
  );
}

export default TransactionViewer;