import Add from "./Components/Add";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import { Form } from 'react-bootstrap';
import MoveWages from "./Components/MoveWages";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { transactionOperationAtom } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue } from "recoil";

function OperationPage({ show, handleClose }) {

    const transactionOperation = useRecoilValue(transactionOperationAtom);

    return (
        <Offcanvas show={show} onHide={handleClose} placement='top' style={{ backgroundColor: "cornsilk" }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{transactionOperation}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Add handleClose={handleClose} />
                    <Edit handleClose={handleClose} />
                    <Delete handleClose={handleClose} />
                    <MoveWages handleClose={handleClose} />
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OperationPage;
