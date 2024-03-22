import { Button } from 'react-bootstrap';

function SaveAndCancelButtons({ save, cancelTransactionOperation, saveButtonText, cancelButtonText }) {

    return (
        <div style={{ marginTop: "20px" }}>
            <Button size="sm" onClick={() => save()}>{saveButtonText ?? "Save"}</Button>
            <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => cancelTransactionOperation()}>{cancelButtonText ?? "Cancel"}</Button>
        </div>
    );
}

export default SaveAndCancelButtons;