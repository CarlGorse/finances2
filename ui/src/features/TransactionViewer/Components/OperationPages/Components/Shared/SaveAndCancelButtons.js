import { Button } from 'react-bootstrap';

function SaveAndCancelButtons({ save, saveButtonText, cancelButtonText, saveButtonEnabled, handleClose }) {

    return (
        <div style={{ marginTop: "20px" }}>
            <Button size="sm" onClick={() => save()} disabled={!saveButtonEnabled}>{saveButtonText ?? "Save"}</Button>
            <Button style={{ marginLeft: "1px" }} size="sm" onClick={handleClose}>{cancelButtonText ?? "Cancel"}</Button>
        </div>
    );
}

export default SaveAndCancelButtons;