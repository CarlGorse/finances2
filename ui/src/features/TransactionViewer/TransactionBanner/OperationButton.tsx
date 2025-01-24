import { Button } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';
import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { useSetRecoilState } from 'recoil';

function OperationButton({ description, isEnabled }) {

    const [transactionOperation, setTransactionOperation] = useRecoilState<string>(transactionOperationState);
    const setShowTransactionOperationsSidebar = useSetRecoilState(showTransactionOperationsSidebarState);

    return (
        <Button
            size="sm"
            variant={transactionOperation === description ? "info" : "primary"}
            onClick={() => {
                if (transactionOperation !== description) {
                    setTransactionOperation(description);
                    setShowTransactionOperationsSidebar(true);
                }
                else {
                    setTransactionOperation(null);
                    setShowTransactionOperationsSidebar(false);
                }
            }}
            disabled={!isEnabled}
        >
            {description}
        </Button>
    );
}

export default OperationButton;