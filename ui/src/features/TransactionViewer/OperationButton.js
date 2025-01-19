import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';

function OperationButton({ operation }) {

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);
    console.log(55);
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