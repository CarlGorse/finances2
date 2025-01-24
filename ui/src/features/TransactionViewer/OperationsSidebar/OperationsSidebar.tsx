import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationPage from './OperationPage/OperationPage';

import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

export default function OperationsSidebar() {

  const [showSidebarState, setShowSidebarState] = useRecoilState(showTransactionOperationsSidebarState);
  const transactionOperation = useRecoilValue<string>(transactionOperationState);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (transactionOperation) {
      setShow(true);
    }
    else {
      setShow(false);
    }
  }, [transactionOperation])

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