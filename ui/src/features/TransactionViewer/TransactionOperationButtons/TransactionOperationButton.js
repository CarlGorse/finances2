import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from "recoil";

function TransactionOperationButton({ operation }) {

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const variant = operation === transactionOperation ? "info" : "primary";

    return (
        <Button variant={variant} onClick={() => setTransactionOperation(prevValue => prevValue === operation ? "" : operation)}>{operation}</Button>
    );
}

export default TransactionOperationButton;