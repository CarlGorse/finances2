import { Button } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import TransactionOperationButton from "./TransactionOperationButton";
import { useSetRecoilState } from "recoil";

function TransactionOperationButtons() {

    const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);

    function Clear() {
        setSelectedTransactions(null);
        setTransactionOperation(null);
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
