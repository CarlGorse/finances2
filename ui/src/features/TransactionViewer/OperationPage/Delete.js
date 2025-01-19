import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { reloadTransactionsAtom } from 'common/recoil/atoms/ReloadTransactionsAtom';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { Table } from 'react-bootstrap';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';

function Delete({ handleClose }) {

    const [selectedTransactions, setSelectedTransactions] = useRecoilState(selectedTransactionsAtom);
    const setReloadTransactions = useSetRecoilState(reloadTransactionsAtom);
    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);

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
                setSelectedTransactions(null);
                setReloadTransactions(new Date());

                setUserMessage({
                    Message: `Transaction${selectedTransactions.length === 1 ? '' : 's'} deleted.`,
                    Variant: "success"
                })
                CancelTransactionOperation()
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data.validationErrors[0],
                    Variant: "danger"
                })
            })
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
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