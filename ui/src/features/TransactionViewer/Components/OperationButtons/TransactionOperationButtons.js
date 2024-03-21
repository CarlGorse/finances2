import ClearButton from './ClearButton';
import TransactionOperationButton from "./TransactionOperationButton";

function TransactionOperationButtons() {

    return (
        <>
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
        </>
    );
}

export default TransactionOperationButtons;
