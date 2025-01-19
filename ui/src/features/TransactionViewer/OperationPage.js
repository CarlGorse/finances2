import { Form } from 'react-bootstrap';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from 'recoil';

function OperationPage() {

    const transactionOperation = useRecoilValue(transactionOperationAtom);

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
