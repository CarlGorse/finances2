import { apiBaseUrl } from 'consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from "recoil/atoms/LastTransactionsLoadDateAtom";
import SaveAndCancelButtons from './Shared/SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { Table } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import TransactionHeader from 'components/TransactionHeader';
import TransactionRow from 'components/TransactionRow';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function Delete({ handleClose }) {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);

    const setUserMessage = useSetRecoilState(userMessageAtom);
    const setLastTransactionsLoadDate = useSetRecoilState(lastTransactionsLoadDateAtom);

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
                setLastTransactionsLoadDate(new Date());
                setUserMessage({
                    Message: `Transaction${selectedTransactions.length === 1 ? '' : 's'} deleted.`,
                    Variant: "success"
                })
                CancelTransactionOperation()
            })
            .catch(function (error) {
                setUserMessage({
                    Message: error.response.data,
                    Variant: "danger"
                })
            })
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <span>{`Do you wish to delete ${selectedTransactions.length === 1 ? 'this transaction' : `these transactions`}?`}</span>

            <div style={{ paddingTop: "10px" }} />

            <Table className="table-bordered">

                <div style={{ paddingTop: "10px" }}>
                    <TransactionHeader showClearOption={false} />
                </div>

                {selectedTransactions.map((transaction, index) => (
                    <TransactionRow
                        key={transaction.TransactionId}
                        transaction={transaction}
                        backgroundColor={index % 2 === 0 ? "lightGrey" : "white"}
                    />
                ))}
            </Table>

            <SaveAndCancelButtons
                save={() => Delete()}
                saveButtonText="Yes"
                cancelButtonText="No"
                handleClose={handleClose}
            />

        </>
    );
}

export default Delete;