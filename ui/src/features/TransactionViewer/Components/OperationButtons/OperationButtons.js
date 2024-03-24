import ClearButton from './ClearButton';
import { Form } from 'react-bootstrap';
import OperationButton from "./OperationButton";

function TransactionOperationButtons() {

    return (
        <Form>

            <span>
                <ClearButton />
            </span>
            <span style={{ marginLeft: "20px" }}>
                <OperationButton operation="Add" />
            </span>
            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="Edit" />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="Delete" />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="Move wages" />
            </span >
        </Form >
    );
}

export default TransactionOperationButtons;
