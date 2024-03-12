import { Button, Container } from 'react-bootstrap';
import TransactionOperationButton from "./Button";
import Add from "../TransactionOperationInputs/Add";
import Delete from "../TransactionOperationInputs/Delete";
import Edit from "../TransactionOperationInputs/Edit";
import MoveWages from "../TransactionOperationInputs/MoveWages";
import { useSetRecoilState } from "recoil";
import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';

function TransactionOperationButtons() {

    const setClearSelectedTransactions = useSetRecoilState(clearSelectedTransactionsAtom);

    async function ClearSelection() {
        await setClearSelectedTransactions(true);
        setClearSelectedTransactions(false);
    }

    return (
        <>
            <span>
                <Button onClick={() => ClearSelection()}>Clear selection</Button>
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
