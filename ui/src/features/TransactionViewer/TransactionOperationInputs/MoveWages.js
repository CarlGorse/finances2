import { Container } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function MoveWages() {

    const operation = "Move wages";

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const setError = useSetRecoilState(transactionOperationErrorAtom);
    const [transactionOperation, setTransactionOperation] = useRecoilState(transactionOperationAtom);

    const isValidForm = transactionOperation === operation
    const hasValidTransactionSelected = selectedTransactions?.length === 2

    useEffect(() => {
        if (isValidForm) {
            if (!hasValidTransactionSelected) {
                setError({
                    Message: `You must select two transactions`,
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

    return (
        <Container>
            Let's mvoe some wages
        </Container>
    );
}

export default MoveWages;