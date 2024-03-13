import AddEdit from './AddEdit';
import { Button } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilState, useRecoilValue } from "recoil";
import { useSetError } from "hooks/useSetError";
import { useClearError } from "hooks/useClearError";

function Edit() {

    const operation = "Edit";

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const showForm = transactionOperation === operation
    const hasValidTransactionSelected = selectedTransactions?.length === 1

    useClearError(showForm && hasValidTransactionSelected);
    useSetError(`You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`, "warning", showForm && !hasValidTransactionSelected);

    if (!showForm || !hasValidTransactionSelected) {
        return null
    }

    function Edit() {

    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <>
            <AddEdit />
            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Edit()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </ >
    );
}

export default Edit;