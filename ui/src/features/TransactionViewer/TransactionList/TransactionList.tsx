import { useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadedTransactionsState } from "recoil/atoms/LoadedTransactionsState";
import { transactionsPageDataState } from "recoil/atoms/TransactionsPageDataState";
import TransactionsPageData from "types/TransactionsPageData";
import TransactionHeader from "./TransactionHeader";
import TransactionRow from "./TransactionRow/TransactionRow";
import useLoadTransactions from "./useLoadTransactions";

import Spinner from "components/FinancesSpinner";

function TransactionList() {
  const [loading] = useState(null);

  const loadedTransactions = useRecoilValue(loadedTransactionsState);

  const setPageData = useSetRecoilState<TransactionsPageData>(
    transactionsPageDataState,
  );

  let transactionLoadingProgress = useLoadTransactions();

  return transactionLoadingProgress === "loading" ? (
    <Spinner />
  ) : (
    <Container style={{ border: "1px solid lightGrey" }}>
      <Row className="mt-4">
        <TransactionHeader />
      </Row>

      {loading && (
        <>
          <Spinner />
          <span>loading transactions</span>
        </>
      )}

      {!loading &&
        loadedTransactions?.Transactions?.map((transaction, index) => (
          <Accordion>
            <div className="mt-1">
              <TransactionRow
                key={transaction.TransactionId}
                transaction={transaction}
              />
            </div>
          </Accordion>
        ))}
    </Container>
  );
}

export default TransactionList;
