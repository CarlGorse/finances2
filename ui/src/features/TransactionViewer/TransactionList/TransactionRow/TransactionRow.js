import Form from 'react-bootstrap/Form';
import WageTotalBadge from 'features/TransactionViewer/TransactionList/TransactionRow/WageTotalBadge';

import { Col, Row } from 'react-bootstrap';
import { formatCurrency } from 'functions/CurrencyFunctions';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsState';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function TransactionRow({ transaction, backgroundColor, colorOnSelect }) {

  const selectedTransactions = useRecoilValue(selectedTransactionsState);
  const [isSelected, setIsSelected] = useState(false);

  const setSelectedTransactions = useSetRecoilState(selectedTransactionsState);

  useEffect(() => {
    setIsSelected(selectedTransactions?.some(x => x.TransactionId === transaction.TransactionId));
  }, [selectedTransactions, transaction]);

  function onCheck() {
    setIsSelected(!isSelected)

    if (!isSelected) {
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
      <Col className="tableCell text-center" xs={1}>
        <Form.Check checked={isSelected} onChange={() => onCheck()} />
      </Col>

      <Col className="tableCell" xs={2}>
        {transaction.EffDate}
      </Col>

      <Col className="tableCell" xs={4}>
        {`${transaction.Category.Group.Name} | ${transaction.Category.Name}`}
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