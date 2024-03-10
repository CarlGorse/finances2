import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useSetRecoilState } from "recoil";

function CancelButton() {

    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <Button size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
    );
}

export default CancelButton;