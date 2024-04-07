import { Form } from 'react-bootstrap';
import { GetOperationProperties } from 'common/functions/OperationFunctions';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { selectedTransactionsAtom } from 'common/recoil/atoms/SelectedTransactionsAtom';
import { transactionOperationAtom } from 'common/recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from 'recoil';

function OperationPage({ show, handleClose }) {

    const selectedTransactions = useRecoilValue(selectedTransactionsAtom);
    const transactionOperation = useRecoilValue(transactionOperationAtom);

    let operationProperties = GetOperationProperties(transactionOperation, selectedTransactions, handleClose);

    return (
        <Offcanvas h-auto show={show} onHide={handleClose} placement='top' style={{ backgroundColor: "cornsilk" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{operationProperties.Description}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    {operationProperties.Markup}
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OperationPage;
