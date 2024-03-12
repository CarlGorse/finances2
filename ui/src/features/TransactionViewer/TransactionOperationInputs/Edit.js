import AddEdit from './AddEdit';
import { Button, Container } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Edit() {

    const operation = "Edit";

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setError = useSetRecoilState(transactionOperationErrorAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const isValidForm = transactionOperation === operation
    const hasValidTransactionSelected = selectedTransactions?.length === 1

    useEffect(() => {
        if (isValidForm) {
            if (!hasValidTransactionSelected) {
                setError({
                    Message: `You must select a ${selectedTransactions?.length > 0 ? " single " : ""}transaction`,
                    Variant: "warning"
                })
            }
            else {
                setError({
                    Message: "",
                    Variant: ""
                })
            }
        }
    }, [transactionOperation, selectedTransactions]);

    if (!isValidForm || !hasValidTransactionSelected) {
        return null
    }

    function Edit() {

    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <Container>
            <AddEdit operation={operation} />
            <div style={{ marginTop: "20px" }}>
                <Button size="sm" onClick={() => Edit()}>Save</Button>
                <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>Cancel</Button>
            </div>
        </Container >
    );
}

export default Edit;