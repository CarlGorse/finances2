import { Button } from 'react-bootstrap';
import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';
import TransactionOperationButton from "./Button";
import { useSetRecoilState } from "recoil";

function TransactionOperationButtons() {

    const setClearSelectedTransactions = useSetRecoilState(clearSelectedTransactionsAtom);

    async function ClearSelectedTransactions() {
        await setClearSelectedTransactions(true);
        setClearSelectedTransactions(false);
    }

    return (
        <>
            <span>
                <Button onClick={() => ClearSelectedTransactions()}>Clear selection</Button>
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
