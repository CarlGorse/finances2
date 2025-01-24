import AddEdit from './AddEdit';
import Delete from './Delete';
import MoveWages from './MoveWages';

import { Form } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from 'recoil';

function OperationPage() {

    const transactionOperation = useRecoilValue(transactionOperationState);

    let markup;

    switch (transactionOperation) {
        case "Add":
            markup = <AddEdit apiMethod="add" />
            break;
        case "Edit":
            markup = <AddEdit apiMethod="add" />
            break;
        case "Delete":
            markup = <Delete apiMethod="add" />
            break;
        case "Move wages":
            markup = <MoveWages apiMethod="add" />
            break;
        default:
    }

    return (
        <Form>
            {markup}
        </Form>
    );
}

export default OperationPage;
