import Spinner from "components/FinancesSpinner";
import { Button } from 'react-bootstrap';

interface params {
    save: () => void,
    saveButtonText: string,
    cancelButtonText: string,
    saveButtonEnabled: boolean,
    handleClose: () => void,
    isSaving: boolean
}

export default function SaveAndCancelButtons({
    save,
    saveButtonText,
    cancelButtonText,
    saveButtonEnabled,
    handleClose,
    isSaving }: params) {

    var saveButtonOrSpinner = isSaving ? <Spinner /> : <Button size="sm" onClick={() => save()} disabled={!saveButtonEnabled}> {saveButtonText ?? "Save"}</Button>

    return (
        <div style={{ marginTop: "20px" }}>

            {saveButtonOrSpinner}
            <Button style={{ marginLeft: "1px" }} size="sm" onClick={handleClose} > {cancelButtonText ?? "Close"}</Button>
        </div>
    );
}