import { Alert } from 'react-bootstrap';
import { userMessageState } from 'recoil/atoms/UserMessageState';
import { useRecoilValue } from 'recoil';

function UserMessages() {

    const userMessage = useRecoilValue(userMessageState);

    if (!userMessage?.Message?.length > 0) {
        return null
    }

    return (
        <Alert variant={userMessage.Variant}>
            {userMessage.Message}
        </Alert>
    );
}

export default UserMessages;
