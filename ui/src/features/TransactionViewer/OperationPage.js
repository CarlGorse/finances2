import { Form } from 'react-bootstrap';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from 'recoil';

function OperationPage() {

    const transactionOperation = useRecoilValue(transactionOperationState);

    if (!transactionOperation) {
        return;
    }

    return (
        <Form>
            {transactionOperation.Markup}
        </Form>
    );
}

export default OperationPage;
