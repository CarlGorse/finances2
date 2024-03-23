import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import SaveAndCancelButtons from './Components/SaveAndCancelButtons';

function Delete() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Delete"
    const hasValidTransactionSelected = selectedTransactions?.length >= 1
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);

    useEffect(() => {
        if (showForm) {
            if (!hasValidTransactionSelected) {
                setUserMessage({ Message: `You must select at least one transaction.`, Variant: "warning" });
            }
            else {
                setUserMessage(null);
            }
        }
    })

    if (!showForm || !hasValidTransactionSelected) {
        return null
    }

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
            .then(function (response) {
                setRefreshTransactions(true);
                setUserMessage({
                    Message: `${selectedTransactions.length} transaction${selectedTransactions.length === 1 ? '' : 's'} deleted`,
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
            <span>{`Do you wish to delete ${selectedTransactions.length === 1 ? 'this transaction' : `these ${selectedTransactions.length} transactions`}?`}</span>
            <span style={{ marginLeft: "1px" }} >
                <SaveAndCancelButtons
                    save={() => Delete()}
                    saveButtonText="Yes"
                    cancelButtonText="No"
                />
            </span>
        </>
    );
}

export default Delete;