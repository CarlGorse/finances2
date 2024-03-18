import { Button } from 'react-bootstrap';
import { selectedTransactionsAtom } from 'recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useSetRecoilState } from "recoil";

function ClearButton() {

    const setSelectedTransactions = useSetRecoilState(selectedTransactionsAtom);
    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);
    const setUserMessage = useSetRecoilState(userMessageAtom);

    function doCancel() {
        setSelectedTransactions(null);
        setTransactionOperation(null);
        setUserMessage(null);
    }

    return (
        <Button onClick={() => doCancel()}>Clear</Button>
    );
}

export default ClearButton;