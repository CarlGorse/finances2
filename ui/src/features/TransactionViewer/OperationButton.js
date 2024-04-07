import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';

function OperationButton({ operation, enabled, description }) {

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const onClick = () => {
        setTransactionOperation(operation)
    }

    return (
        <Button
            variant={transactionOperation === operation ? "info" : "primary"}
            onClick={onClick}
            disabled={!enabled}
        >
            {description}
        </Button>
    );
}

export default OperationButton;