import { Alert } from 'react-bootstrap';
import { errorAtom } from 'recoil/atoms/ErrorAtom';
import { useRecoilValue } from "recoil";

function TransactionOperationError() {

    const error = useRecoilValue(errorAtom);

    console.log(error)

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
