import { Form } from 'react-bootstrap';
import { GetOperationProperties } from 'common/functions/OperationFunctions';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from 'recoil';

function OperationPage({ show, handleClose }) {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const transactionOperation = useRecoilValue(transactionOperationAtom);

    let operationProperties = GetOperationProperties(transactionOperation, selectedTransactions, handleClose);

    return (

        <Form>
            {operationProperties.Markup}
        </Form>

    );
}

export default OperationPage;
