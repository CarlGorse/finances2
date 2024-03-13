import { Button } from 'react-bootstrap';
import CancelButton from '../TransactionOperationButtons/CancelButton'
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useSetError } from "hooks/useSetError";
import { useRecoilState, useRecoilValue } from "recoil";
import { useClearError } from "hooks/useClearError";

function Delete() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);

    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === "Delete"
    const hasValidTransactionSelected = selectedTransactions?.length === 1

    useClearError(showForm && hasValidTransactionSelected);
    useSetError(`You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`, "warning", showForm && !hasValidTransactionSelected);

    if (!showForm || !hasValidTransactionSelected) {
        return null;
    }

    function Delete() {
        CancelTransactionOperation()
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <span>Do you wish to delete this transaction? </span>
            <span style={{ marginLeft: "10px" }} >
                <Button size="sm" onClick={() => Delete()}>Yes</Button>
            </span>
            <span style={{ marginLeft: "1px" }} >
                <CancelButton />
            </span>
        </>
    );
}

export default Delete;