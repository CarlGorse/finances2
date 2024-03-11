import { Button, Container } from 'react-bootstrap';
import CancelButton from '../TransactionOperationButtons/CancelButton'
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Delete() {

    const operation = "Delete";

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
        return null;
    }

    function Delete() {
        CancelTransactionOperation()
    }

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <Container>
            <span>Do you wish to delete this transaction? </span>
            <Button size="sm" onClick={() => Delete()}>Yes</Button>
            <CancelButton />
        </Container>
    );
}

export default Delete;