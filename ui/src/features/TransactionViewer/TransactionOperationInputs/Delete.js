import { apiBaseUrl } from 'functions/Api';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CancelButton from '../TransactionOperationButtons/CancelButton'
import { systemErrorAtom } from 'recoil/atoms/SystemErrorAtom';
import { refreshTransactionsAtom } from "recoil/atoms/RefreshTransactionsAtom";
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'

function Delete() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Delete"
    const hasValidTransactionSelected = selectedTransactions?.length >= 1
    const setSystemError = useSetRecoilState(systemErrorAtom);
    const setRefreshTransactions = useSetRecoilState(refreshTransactionsAtom);

    useEffect(() => {
        if (showForm) {
            if (!hasValidTransactionSelected) {
                setSystemError({ Message: `You must select at least one transaction.`, Variant: "warning" });
            }
            else {
                setSystemError(null);
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
                setSystemError({
                    Message: `${selectedTransactions.length} transaction${selectedTransactions.length === 1 ? '' : 's'} deleted`,
                    Variant: "success"
                })
                CancelTransactionOperation()
            })
            .catch(function (error) {
                setSystemError({
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
            <span>{`Do you wish to delete ${selectedTransactions.length === 1 ? 'this' : 'these'} ${selectedTransactions.length} transaction${selectedTransactions.length === 1 ? "" : "s"}?`}</span>
            <span style={{ marginLeft: "10px" }} >
                <Button size="sm" onClick={() => Delete()}>Yes</Button>
            </span>
            <span style={{ marginLeft: "1px" }} >
                <CancelButton />
            </span>
        </>
    );
}

export default Delete;