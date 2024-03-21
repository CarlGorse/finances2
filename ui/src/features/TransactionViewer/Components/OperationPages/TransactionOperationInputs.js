import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import MoveWages from "./MoveWages";

function TransactionOperationInputs() {

    return (
        <>
            <Add />
            <Edit />
            <Delete />
            <MoveWages />
        </>
    );
}

export default TransactionOperationInputs;
