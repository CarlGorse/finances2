import AddEdit from './AddEdit';
import { Button, Container } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Add() {

    const operation = "Add";

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setError = useSetRecoilState(transactionOperationErrorAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const isValidForm = transactionOperation === operation

    useEffect(() => {
        if (isValidForm) {
            setError({
                Message: "",
                Variant: ""
            })
        }
    }, [transactionOperation, selectedTransactions]);

    if (!isValidForm) {
        return null
    }

    function Add() {
        CancelTransactionOperation()
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <AddEdit operation={operation} />
            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Add()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </>
    );
}

export default Add;