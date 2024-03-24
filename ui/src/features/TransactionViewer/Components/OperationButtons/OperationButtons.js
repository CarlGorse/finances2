import ClearButton from './ClearButton';
import { Form } from 'react-bootstrap';
import TransactionOperationButton from "./OperationButton";

function TransactionOperationButtons() {

    return (
        <Form>
            <span>
                <ClearButton />
            </span>
            <span style={{ marginLeft: "20px" }}>
                <TransactionOperationButton operation="Add" />
            </span>
            <span style={{ marginLeft: "1px" }}>
                <TransactionOperationButton operation="Edit" />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <TransactionOperationButton operation="Delete" />
            </span >
            <span style={{ marginLeft: "1px" }}>
                <TransactionOperationButton operation="Move wages" />
            </span >
        </Form >
    );
}

export default TransactionOperationButtons;
