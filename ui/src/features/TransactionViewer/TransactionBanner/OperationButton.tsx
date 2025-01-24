import { Button } from 'react-bootstrap';
import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { validTransactionOperationsState } from 'recoil/atoms/ValidTransactionOperationsState';

export default function OperationButton({ description }) {

    const transactionOperation = useRecoilValue<string>(transactionOperationState);
    const validTransactionOperations = useRecoilValue<string[]>(validTransactionOperationsState);

    const setShowTransactionOperationsSidebar = useSetRecoilState(showTransactionOperationsSidebarState);
    const setTransactionOperation = useSetRecoilState<string>(transactionOperationState);

    let isEnabled = validTransactionOperations.includes(description);

    return (
        <Button
            size="sm"
            variant={"primary"}
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