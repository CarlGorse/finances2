import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationPage from './OperationPage/OperationPage';

import { useRecoilValue } from 'recoil';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';

export default function OperationsSidebar({ show, setShow }) {

  const transactionOperation = useRecoilValue<string>(transactionOperationState);

  return (

    <Offcanvas
      show={show}
      placement="end"
      style={{ backgroundColor: "cornsilk" }}
      scroll={true}
      backdrop={false}
    >
      <Offcanvas.Header>
        <Offcanvas.Title>{transactionOperation}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <OperationPage handleClose={() => setShow(false)} />
      </Offcanvas.Body>

    </Offcanvas>
  );
}