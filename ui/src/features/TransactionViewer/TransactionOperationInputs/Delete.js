import { Button } from 'react-bootstrap';
import CancelButton from '../TransactionOperationButtons/CancelButton'
import { errorAtom } from 'recoil/atoms/ErrorAtom';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'

function Delete() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Delete"
    const hasValidTransactionSelected = selectedTransactions?.length === 1
    const setError = useSetRecoilState(errorAtom);

    useEffect(() => {
        if (showForm) {
            if (!hasValidTransactionSelected) {
                setError({ Message: `You must select a${selectedTransactions?.length > 0 ? " single" : ""} transaction`, Variant: "warning" });
            }
            else {
                setError(null);
            }
        }
    }, [showForm, hasValidTransactionSelected])

    if (!showForm || !hasValidTransactionSelected) {
        return null;
    }

    function Delete() {
        CancelTransactionOperation()
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <span>Do you wish to delete this transaction? </span>
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