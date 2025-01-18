import { apiBaseUrl } from 'common/consts/ApiConsts';
import axios from 'axios';
import { lastTransactionsLoadDateAtom } from 'common/recoil/atoms/LastTransactionsLoadDateAtom';
import SaveAndCancelButtons from './SaveAndCancelButtons';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { Table } from 'react-bootstrap';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import TransactionHeader from 'common/components/TransactionHeader';
import TransactionRow from 'common/components/TransactionRow';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMessageAtom } from 'common/recoil/atoms/UserMessageAtom';
import { loadedTransactionsAtom } from 'common/recoil/atoms/LoadedTransactionsAtom';

function Delete({ handleClose }) {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);
    const setLoadedTransactions = useSetRecoilState(loadedTransactionsAtom);

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
                cancelButtonText="Cancel"
                handleClose={handleClose}
                saveButtonEnabled={selectedTransactions.length > 0}
            />

        </>
    );
}

export default Delete;