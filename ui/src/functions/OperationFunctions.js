import AddEdit from '../features/TransactionViewer/OperationPage/AddEdit';
import Delete from '../features/TransactionViewer/OperationPage/Delete';
import MoveWages from '../features/TransactionViewer/OperationPage/MoveWages';
import { useSetRecoilState } from 'recoil';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';

export const operationAdd = "add";
export const operationEdit = "edit";
export const operationDelete = "delete";
export const operationMoveWages = "move-wages";

function GetOperationProperties(transactionOperation, selectedTransactions) {

    const setTransactionOperation = useSetRecoilState(transactionOperationState);

    let description;
    let markup;
    let isEnabled;

    let handleClose = () => setTransactionOperation(null)

    switch (transactionOperation) {
        case operationAdd:
            description = "add";
            markup = <AddEdit apiMethod="add" handleClose={handleClose} />;
            isEnabled = true
            break;
        case operationEdit:
            description = "edit";
            markup = <AddEdit apiMethod="edit" handleClose={handleClose} />;
            isEnabled = selectedTransactions?.length === 1;
            break;
        case operationDelete:
            description = "delete";
            markup = <Delete handleClose={handleClose} />;
            isEnabled = selectedTransactions?.length >= 1;
            break;
        case operationMoveWages:
            description = "move wages";
            markup = <MoveWages handleClose={handleClose} />;
            isEnabled = selectedTransactions?.length === 2
                && selectedTransactions.filter(x => x.IsWage === true).length === 2
                && selectedTransactions[0].EffDate === selectedTransactions[1].EffDate;
            break;
        default:
            break;
    }

    return {
        Description: description,
        Markup: markup,
        IsEnabled: isEnabled
    };
}

export { GetOperationProperties };
