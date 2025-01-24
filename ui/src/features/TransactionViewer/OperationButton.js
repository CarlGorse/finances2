import { Button } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';

function OperationButton({ operation }) {

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationState);

    return (
        <Button
            size="sm"
            variant={transactionOperation === operation ? "info" : "primary"}
            onClick={() => {
                setTransactionOperation(operation);
            }}
            disabled={!operation.IsEnabled}
        >
            {operation.Description}
        </Button>
    );
}

export default OperationButton;