import Add from "./Components/Add";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import { Form } from 'react-bootstrap';
import MoveWages from "./Components/MoveWages";

function OperationPages() {

    return (
        <div style={{ backgroundColor: "cornsilk", padding: "5px" }}>
            <Form>
                <Add />
                <Edit />
                <Delete />
                <MoveWages />
            </Form>
        </div>
    );
}

export default OperationPages;
