import axios from 'axios';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import useClearSelectedTransactions from 'hooks/useClearSelectedTransactions';

import { apiBaseUrl } from 'consts/ApiConsts';
import { Col, Row } from 'react-bootstrap';
import { dateToLoadTransactionsState } from 'recoil/atoms/DateToLoadTransactionsState';
import { selectedTransactionsState } from 'recoil/atoms/SelectedTransactionsState';
import { Table } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMessageState } from 'recoil/atoms/UserMessageState';

function Delete({ handleClose }) {

    const selectedTransactions = useRecoilValue(selectedTransactionsState);

    const clearSelectedTransactions = useClearSelectedTransactions();
    const setDateToLoadTransactions = useSetRecoilState(dateToLoadTransactionsState);
    const setTransactionOperation = useSetRecoilState(transactionOperationState);
    const setUserMessage = useSetRecoilState(userMessageState);

    function Delete() {

        axios.post(
            apiBaseUrl + "/transactions/delete",
            selectedTransactions.map(x => x.TransactionId),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(function () {
                clearSelectedTransactions();
                setDateToLoadTransactions(new Date());

                setUserMessage({
                    Message: `Transaction${selectedTransactions.length === 1 ? '' : 's'} deleted.`,
                    Variant: "success"
                })

                setTransactionOperation(null)
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.validationErrors[0],
                    Variant: "danger"
                })
            })
    }

    return (
        <>
            <span>
                {`Do you wish to delete ${selectedTransactions.length === 1 ? 'this transaction' : `these transactions`}?`}
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