import { Button, Container } from 'react-bootstrap';
import TransactionOperationButton from "./TransactionOperationButton";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import MoveWages from "./MoveWages";
import { useSetRecoilState } from "recoil";
import { clearSelectedTransactionsAtom } from 'recoil/atoms/ClearSelectedTransactionsAtom';

function TransactionOperations() {

    const setClearSelectedTransactions = useSetRecoilState(clearSelectedTransactionsAtom);

    async function ClearSelection() {
        await setClearSelectedTransactions(true);
        setClearSelectedTransactions(false);
    }

    return (
        <Container>
            <Button onClick={() => ClearSelection()}>Clear selection</Button>
            <TransactionOperationButton operation="Add" />
            <TransactionOperationButton operation="Edit" />
            <TransactionOperationButton operation="Delete" />
            <TransactionOperationButton operation="Move wages" />
            <Add />
            <Edit />
            <Delete />
            <MoveWages />
        </Container>
    );
}

export default TransactionOperations;
