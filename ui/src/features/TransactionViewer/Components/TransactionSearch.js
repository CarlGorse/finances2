import { selectedBankAccountAtom } from 'recoil/atoms/SelectedBankAccountAtom';
import FilterItem from './TransactionSearch/FilterItem'
import { Row, Col } from 'react-bootstrap';
import { transactionSearchAtom } from 'recoil/atoms/TransactionSearchAtom';
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function TransactionSearch() {

  const periods = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const years = ["2023", "2024"]
  const [transactionSearch, setTransactionSearch] = useRecoilState(transactionSearchAtom);
  const selectedBankAccount = useRecoilValue(selectedBankAccountAtom);

  function UpdateTransactionSearch(propertyName, value) {
    //setTransactionSearch(prevState => ({ ...prevState, [propertyName]: value }))
  }

  useEffect(() => {
    UpdateTransactionSearch("AccountId", selectedBankAccount.AccountId)
  }, [selectedBankAccount])

  return (
    <>
      <Row>
        <Col xs={1}>From:</Col>
        <Col xs={1}>
          <FilterItem defaultValue={transactionSearch?.StartPeriod} onSelect={value => UpdateTransactionSearch("StartPeriod", value)} values={periods} />
        </Col>
        <Col>
          <FilterItem defaultValue={transactionSearch?.StartYear} onSelect={value => UpdateTransactionSearch("StartYear", value)} values={years} />
        </Col>
        <Col>

        </Col>
      </Row>
      <Row>
        <Col xs={1}>To:</Col>
        <Col xs={1}>
          <FilterItem defaultValue={transactionSearch?.EndPeriod} onSelect={value => UpdateTransactionSearch("EndPeriod", value)} values={periods} />
        </Col>
        <Col>
          <FilterItem defaultValue={transactionSearch?.EndYear} onSelect={value => UpdateTransactionSearch("EndYear", value)} values={years} />
        </Col>
        <Col>
        </Col>
      </Row>
    </>
  );
}

export default TransactionSearch;