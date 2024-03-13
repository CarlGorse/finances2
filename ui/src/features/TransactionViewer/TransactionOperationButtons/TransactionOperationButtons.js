import { Button } from 'react-bootstrap';
import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';
import TransactionOperationButton from "./TransactionOperationButton";
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useSetRecoilState } from "recoil";
import { useRef, useState } from 'react';
import { useRecoilState } from "recoil";
import { useShowError } from "hooks/useShowError";

function TransactionOperationButtons() {

    const setClearSelectedTransactions = useSetRecoilState(clearSelectedTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
    const [error, setError] = useState(null);

    async function Clear() {
        await ClearSelectedTransactions()
        setTransactionOperation(null);
    }

    async function ClearSelectedTransactions() {
        await setClearSelectedTransactions(true);
        setClearSelectedTransactions(false);
    }

    const prevTransactionOperation = useRef();

    //useShowError(error);
    /*
        useEffect(() => {
            if (
                prevTransactionOperation.current === transactionOperation ||
                (prevTransactionOperation.current !== transactionOperation && transactionOperation)) {
                setError({
                    Message: null,
                    Variant: null
                })
                prevTransactionOperation.current = transactionOperation
            }
        }, [setError, transactionOperation]);
    */
    return (
        <>
            <span>
                <Button onClick={() => Clear()}>Clear</Button>
            </span>
            <span style={{ marginLeft: "20px" }}>
                <TransactionOperationButton operation="Add" />
            </span>
            <span style={{ marginLeft: "1px" }}>
                <TransactionOperationButton operation="Edit" />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <TransactionOperationButton operation="Delete" />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <TransactionOperationButton operation="Move wages" />
            </span >
        </>
    );
}

export default TransactionOperationButtons;
