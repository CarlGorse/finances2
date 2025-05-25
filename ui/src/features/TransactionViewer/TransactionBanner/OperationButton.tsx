import { Button } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { validTransactionOperationsState } from 'recoil/atoms/ValidTransactionOperationsState';

export default function OperationButton({ description, setShowSidebar }) {

    const transactionOperation = useRecoilValue<string>(transactionOperationState);
    const validTransactionOperations = useRecoilValue<string[]>(validTransactionOperationsState);

    const setTransactionOperation = useSetRecoilState<string>(transactionOperationState);

    let isEnabled = validTransactionOperations.includes(description);

    return (
        <Button
            size="sm"
            variant={"primary"}
            onClick={() => {
                if (transactionOperation !== description) {
                    setTransactionOperation(description);
                    //setShowSidebar(true);
                }
                else {
                    setTransactionOperation(null);
                    //setShowSidebar(false);
                }
            }}
            disabled={!isEnabled}
        >
            {description}
        </Button>
    );
}