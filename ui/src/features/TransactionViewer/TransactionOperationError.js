import { Alert } from 'react-bootstrap';
import { transactionOperationErrorAtom } from 'recoil/atoms/TransactionOperationErrorAtom';
import { useRecoilValue } from "recoil";

function TransactionOperationError() {

    const error = useRecoilValue(transactionOperationErrorAtom);

    if (!error?.Message?.length > 0) {
        return null
    }

    return (
        <Alert variant={error.Variant}>
            {error.Message}
        </Alert>
    );
}

export default TransactionOperationError;
