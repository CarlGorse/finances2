import { Button } from 'react-bootstrap';

function SaveAndCancelButtons({ save, cancelTransactionOperation }) {

    return (
        <div style={{ marginTop: "20px" }}>
            <Button size="sm" onClick={() => save()}>Save</Button>
            <Button style={{ marginLeft: "1px" }} size="sm" onClick={() => cancelTransactionOperation()}>Cancel</Button>
        </div>
    );
}

export default SaveAndCancelButtons;