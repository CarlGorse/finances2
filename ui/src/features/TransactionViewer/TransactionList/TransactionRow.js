import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime';
import { formatCurrency } from 'functions/Currency';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function TransactionRow({ transaction, runningTotal }) {

  const clearSelectedTransactions = useRecoilValue(clearSelectedTransactionsAtom);
  const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsAtom);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (clearSelectedTransactions) {
      selectOrDeslectTransaction(false)
    }
  }, [clearSelectedTransactions]);

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

  return (
    <Row>
      <Col xs={1}>
        <Form.Check checked={isSelected} onChange={() => onCheck()} />
      </Col>
      <Col xs={1}>
        {formatDateTimeAsDateDDMMYYYY(transaction.EffDate)}
      </Col>
      <Col xs={2}>
        {transaction.Category.Group.Name}
      </Col>
      <Col xs={2}>
        {transaction.Category.Name}
      </Col>
      <Col xs={2}>
        {transaction.Description}
      </Col>
      <Col xs={1}>
        {formatCurrency(transaction.Credit)}
      </Col>
      <Col xs={1}>
        {formatCurrency(transaction.Debit)}
      </Col>
      <Col xs={2}>
        {formatCurrency(runningTotal)}
      </Col>
    </Row>
  )
}

export default TransactionRow;