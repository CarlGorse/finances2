import AddEdit from './AddEdit';
import { Button } from 'react-bootstrap';
import { errorAtom } from 'recoil/atoms/ErrorAtom';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from 'react'

function Edit() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Edit"
    const hasValidTransactionSelected = selectedTransactions?.length === 1
    const setError = useSetRecoilState(errorAtom);

    useEffect(() => {
        if (showForm) {
            if (!hasValidTransactionSelected) {
                setError({ Message: `You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`, Variant: "warning" });
            }
            else {
                setError(null);
            }
        }
    })

    if (!showForm || !hasValidTransactionSelected) {
        return null
    }

    function Edit() {
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <AddEdit transactionOperation={transactionOperation} />

            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Edit()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </ >
    );
}

export default Edit;