import { Form } from 'react-bootstrap';
import { GetOperationProperties } from 'common/functions/OperationFunctions';
import OperationButton from './OperationButton';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { useRecoilValue } from 'recoil';
import { operationAdd, operationEdit, operationDelete, operationMoveWages } from 'common/functions/OperationFunctions';

function TransactionOperationButtons() {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);

    let deleteIsEnabled = false;
    let addIsEnabled = true;
    let editIsEnabled = false;
    let moveWagesIsEnabled = false;

    addIsEnabled = GetOperationProperties(operationAdd, selectedTransactions).IsEnabled;

    if (selectedTransactions) {
        editIsEnabled = GetOperationProperties(operationEdit, selectedTransactions).IsEnabled;
        deleteIsEnabled = GetOperationProperties(operationDelete, selectedTransactions).IsEnabled;
        moveWagesIsEnabled = GetOperationProperties(operationMoveWages, selectedTransactions).IsEnabled;
    }

    return (
        <Form>
            <span style={{ marginLeft: "20px" }}>
                <OperationButton operation="add" enabled={addIsEnabled} description="add" />
            </span>

            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="edit" enabled={editIsEnabled} description="edit" />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="delete" enabled={deleteIsEnabled} description="delete" />
            </span >

            <span style={{ marginLeft: "1px" }}>
                <OperationButton operation="move-wages" enabled={moveWagesIsEnabled} description="move wages" />
            </span >
        </Form >
    );
}

export default TransactionOperationButtons;
