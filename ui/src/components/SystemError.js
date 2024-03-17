import { Alert } from 'react-bootstrap';
import { systemErrorAtom } from 'recoil/atoms/SystemErrorAtom';
import { useRecoilValue } from "recoil";

function SystemError() {

    const systemError = useRecoilValue(systemErrorAtom);

    if (!systemError?.Message?.length > 0) {
        return null
    }

    return (
        <Alert variant={systemError.Variant}>
            {systemError.Message}
        </Alert>
    );
}

export default SystemError;
