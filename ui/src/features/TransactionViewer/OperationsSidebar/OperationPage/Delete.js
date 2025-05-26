import axios from "axios";
import { getValidOperations } from "features/TransactionViewer/Utilities";
import { Col, Row, Table } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dateToLoadTransactionsState } from "recoil/atoms/DateToLoadTransactionsState";
import { selectedTransactionsState } from "recoil/atoms/SelectedTransactionsState";
import { transactionOperationState } from "recoil/atoms/TransactionOperationState";
import { userMessageState } from "recoil/atoms/UserMessageState";
import SaveAndCancelButtons from "./SaveAndCancelButtons.tsx";

import useClearSelectedTransactions from "hooks/useClearSelectedTransactions";

function Delete({ handleClose }) {
  const selectedTransactions = useRecoilValue(selectedTransactionsState);

  const clearSelectedTransactions = useClearSelectedTransactions();
  const setDateToLoadTransactions = useSetRecoilState(
    dateToLoadTransactionsState,
  );
  const setTransactionOperation = useSetRecoilState(transactionOperationState);
  const setUserMessage = useSetRecoilState(userMessageState);
  const transactionOperation = useRecoilValue(transactionOperationState);

  function Delete() {
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/transactions/delete",
        selectedTransactions.map((x) => x.TransactionId),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(function () {
        clearSelectedTransactions();
        setDateToLoadTransactions(new Date());

        setUserMessage({
          Message: `Transaction${selectedTransactions.length === 1 ? "" : "s"} deleted.`,
          Variant: "success",
        });

        setTransactionOperation(null);
      })
      .catch(function (error) {
        setUserMessage({
          Message: error.response.data.validationErrors[0],
          Variant: "danger",
        });
      });
  }

  let validOperations = getValidOperations(selectedTransactions);

  if (!validOperations.includes(transactionOperation)) {
    return;
  }

  return (
    <>
      <span>
        {`Do you wish to delete ${selectedTransactions.length === 1 ? "this transaction" : `these transactions`}?`}
      </span>

      <div style={{ paddingTop: "10px" }} />

      <Table className="table-bordered">
        <div style={{ paddingTop: "10px" }}>
          <Row>
            <Col xs={4}>
              <b>Date</b>
            </Col>
            <Col xs={4}>
              <b>Value</b>
            </Col>
          </Row>
        </div>

        {selectedTransactions.map((transaction, index) => (
          <Row>
            <Col className="tableCell" xs={4}>
              {transaction.EffDate}
            </Col>
            <Col className="tableCell" xs={4}>
              {transaction.Credit > 0 ? transaction.Credit : transaction.Debit}
            </Col>
          </Row>
        ))}
      </Table>

      <SaveAndCancelButtons
        save={() => Delete()}
        saveButtonText="Yes"
        cancelButtonText="Cancel"
        handleClose={handleClose}
        saveButtonEnabled={selectedTransactions.length > 0}
      />
    </>
  );
}

export default Delete;
