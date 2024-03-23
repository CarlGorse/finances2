import { Button } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useSetRecoilState } from "recoil";

function SaveAndCancelButtons({ save, saveButtonText, cancelButtonText }) {

    const setTransactionOperation = useSetRecoilState(transactionOperationAtom);

    function CancelTransactionOperation() {
        setTransactionOperation(null)
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <Button size="sm" onClick={() => save()}>{saveButtonText ?? "Save"}</Button>
            <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => CancelTransactionOperation()}>{cancelButtonText ?? "Cancel"}</Button>
        </div>
    );
}

export default SaveAndCancelButtons;