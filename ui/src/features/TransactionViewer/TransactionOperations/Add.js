import AddEdit from './AddEdit';
import { Button, Container } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from "recoil";

function Add() {

    const operation = "Add";

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const isValidForm = transactionOperation === operation

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
        <Container>
            <AddEdit operation={operation} />
            <Button size="sm" onClick={() => Add()}>Save</Button>
            <Button size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
        </Container>
    );
}

export default Add;