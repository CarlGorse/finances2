import { Button } from 'react-bootstrap';
import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState } from 'recoil';
import { useSetRecoilState } from 'recoil';

export default function OperationButton({ description, isEnabled }) {

    const setShowTransactionOperationsSidebar = useSetRecoilState(showTransactionOperationsSidebarState);
    const [transactionOperation, setTransactionOperation] = useRecoilState<string>(transactionOperationState);

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