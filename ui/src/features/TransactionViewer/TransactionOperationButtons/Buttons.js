import { Button } from 'react-bootstrap';
import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';
import TransactionOperationButton from "./Button";
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useSetRecoilState } from "recoil";
import { useClearError } from "hooks/useClearError";
import { useRecoilState } from "recoil";

function TransactionOperationButtons() {

    const setClearSelectedTransactions = useSetRecoilState(clearSelectedTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);


    async function Clear() {
        await ClearSelectedTransactions()
        setTransactionOperation(null);
    }

    async function ClearSelectedTransactions() {
        await setClearSelectedTransactions(true);
        setClearSelectedTransactions(false);
    }

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
