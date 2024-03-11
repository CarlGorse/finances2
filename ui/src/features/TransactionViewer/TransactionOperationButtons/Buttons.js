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
            <Button onClick={() => ClearSelection()}>Clear selection</Button>
            <TransactionOperationButton operation="Add" />
            <TransactionOperationButton operation="Edit" />
            <TransactionOperationButton operation="Delete" />
            <TransactionOperationButton operation="Move wages" />
        </>
    );
}

export default TransactionOperationButtons;
