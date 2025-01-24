import { Button } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';
import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { useSetRecoilState } from 'recoil';

function OperationButton({ operation }) {

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationState);
    const setShowTransactionOperationsSidebar = useSetRecoilState(showTransactionOperationsSidebarState);

    return (
        <Button
            size="sm"
            variant={transactionOperation === operation ? "info" : "primary"}
            onClick={() => {
                setShowTransactionOperationsSidebar(true)
                setTransactionOperation(operation);
            }}
            disabled={!operation.IsEnabled}
        >
            {operation.Description}
        </Button>
    );
}

export default OperationButton;