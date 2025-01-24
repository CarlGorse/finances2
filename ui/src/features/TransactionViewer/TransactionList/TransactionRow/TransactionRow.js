import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { formatCurrency } from 'functions/CurrencyFunctions';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsAtom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import WageTotalBadge from 'features/TransactionViewer/TransactionList/TransactionRow/WageTotalBadge';

function TransactionRow({ transaction, backgroundColor, colorOnSelect }) {

  const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsState);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    let isSelected = selectedTransactions?.some(x => x.TransactionId === transaction.TransactionId);
    setIsSelected(isSelected);
  }, [selectedTransactions, transaction]);

  function onCheck() {
    selectOrDeslectTransaction(!isSelected);
  }

  function selectOrDeslectTransaction(select) {
    setIsSelected(select)
    if (select) {
      selectTransaction()
    }
    else {
      deselectTransaction()
    }
  }

  function selectTransaction() {
    if (selectedTransactions === null || selectedTransactions === undefined) {
      setSelectedTransactions([transaction]);
    }
    else {
      setSelectedTransactions(prevValue => { let newArray = Object.assign([], prevValue); newArray.push(transaction); return newArray; });
    }
  }

  function deselectTransaction() {
    if (selectedTransactions?.find(x => x.TransactionId === transaction.TransactionId) !== undefined) {
      setSelectedTransactions(prevValue => prevValue.filter(x => x.TransactionId !== transaction.Id));
      return;
    }
  }

  let categoryGroupText = `${transaction.Category.Group.Name} | ${transaction.Category.Name}`

  return (

    <Row>
      <Col className="tableCell text-center" xs={1}>
        <Form.Check checked={isSelected} onChange={() => onCheck()} />
      </Col>

      <Col className="tableCell" xs={2}>
        {transaction.EffDate}
      </Col>

      <Col className="tableCell" xs={4}>
        {categoryGroupText}
      </Col>

      <Col className="tableCell" xs={1}>
        {formatCurrency(transaction.Credit)}
      </Col>

      <Col className="tableCell" xs={1}>
        {formatCurrency(transaction.Debit)}
      </Col>

      <Col className="tableCell" xs={1}>
        {formatCurrency(transaction.AccountRunningTotal)}
      </Col>

      <Col xs={2}>
        <WageTotalBadge transaction={transaction} />
      </Col>

    </Row>
  )
}

export default TransactionRow;