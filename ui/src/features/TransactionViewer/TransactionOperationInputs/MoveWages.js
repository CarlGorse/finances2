import { Container } from 'react-bootstrap';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from "recoil";

function MoveWages() {

    const transactionOperation = useRecoilValue(transactionOperationAtom);

    if (transactionOperation !== "Move wages") {
        return null
    }

    return (
        <Container>
            Let's mvoe some wages
        </Container>
    );
}

export default MoveWages;