import { addEditTransactionAtom } from "recoil/atoms/AddEditTransactionAtom";
import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useSetRecoilState } from "recoil";
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';

function OperationButton({ operation }) {

    const setAddEditTransaction = useSetRecoilState(addEditTransactionAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const variant = transactionOperation === operation ? "info" : "primary";

    const onClick = () => {
        if (transactionOperation === operation) {
            setTransactionOperation(null);
            setUserMessage(null);
            setAddEditTransaction(null);
        }
        else {
            setTransactionOperation(operation)
        }
    }

    return (
        <Button
            variant={variant}
            onClick={onClick}>

            {operation}

        </Button>
    );
}

export default OperationButton;