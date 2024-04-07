import Add from '../../features/TransactionViewer/OperationPage/Add';
import Delete from '../../features/TransactionViewer/OperationPage/Delete';
import Edit from '../../features/TransactionViewer/OperationPage/Edit';
import MoveWages from '../../features/TransactionViewer/OperationPage/MoveWages';

export const operationAdd = "add";
export const operationEdit = "edit";
export const operationDelete = "delete";
export const operationMoveWages = "move-wages";

function GetOperationProperties(transactionOperation, selectedTransactions, handleClose) {

    let description;
    let markup;
    let isEnabled;

    switch (transactionOperation) {
        case operationAdd:
            description = "add";
            markup = <Add handleClose={handleClose} />;
            isEnabled = true
            break;
        case operationEdit:
            description = "edit";
            markup = <Edit handleClose={handleClose} />;
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
