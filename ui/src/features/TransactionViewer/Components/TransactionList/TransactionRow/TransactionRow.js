import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { formatDateTimeAsDateDDMMYYYY } from 'functions/DateTime';
import { formatCurrency } from 'functions/Currency';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import TransactionItemBadge from './ItemBadge';
import TransactionWageTotalBadge from './WageTotalBadge';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
//import styles from './TransactionRow.css';

function TransactionRow({ transaction, backgroundColor }) {

  const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsAtom);
  const [isSelected, setIsSelected] = useState(false);
  const [, setShowDetail] = useState(false);

  useEffect(() => {
    setIsSelected(selectedTransactions?.filter(x => x.TransactionId === transaction.TransactionId).length > 0 ? true : false);
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

  return (

    <div style={{ backgroundColor: isSelected ? "limeGreen" : backgroundColor }}>
      <Row style={{ margin: "0px" }} onClick={() => setShowDetail(prevValue => !prevValue)}>
        <Col className="tableCell text-center" xs={1}>
          <Form.Check checked={isSelected} onChange={() => onCheck()} />
        </Col>
        <Col className="tableCell" xs={1}>
          {formatDateTimeAsDateDDMMYYYY(transaction.EffDate)}
        </Col>
        <Col className="tableCell" xs={2}>
          {transaction.Category.Group.Name}
        </Col>
        <Col className="tableCell" xs={2}>
          {transaction.Category.Name}
        </Col>
        <Col className="tableCell" xs={2}>
          {transaction.Description}
        </Col>
        <Col className="tableCell" xs={1}>
          {formatCurrency(transaction.Credit)}
        </Col>
        <Col className="tableCell" xs={1}>
          {formatCurrency(transaction.Debit)}
        </Col>
        <Col className="tableCell" xs={1}>
          {formatCurrency(transaction.RunningTotal.RunningTotal)}
        </Col>
        <Col>
          <TransactionWageTotalBadge transaction={transaction} />
          <TransactionItemBadge transaction={transaction} />
        </Col>
      </Row>
    </div>

  )
}

export default TransactionRow;