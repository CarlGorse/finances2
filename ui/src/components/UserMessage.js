import { Alert } from 'react-bootstrap';
import { userMessageAtom } from 'recoil/atoms/UserMessageAtom';
import { useRecoilValue } from "recoil";

function UserMessages() {

    const userMessage = useRecoilValue(userMessageAtom);

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
