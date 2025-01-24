import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationPage from './OperationPage/OperationPage';

import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { useRecoilValue } from 'recoil';

export default function OperationsSidebar({ show, setShow }) {

  const transactionOperation = useRecoilValue<string>(transactionOperationState);

  return (

    <Offcanvas
      show={show}
      placement="end"
      onHide={() => {
        setShow(false)
        //setTransactionOperation(null)
      }}
      style={{ backgroundColor: "cornsilk" }}
      scroll={true}
      backdrop={false}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{transactionOperation}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <OperationPage />
      </Offcanvas.Body>

    </Offcanvas>
  );
}