import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationPage from './OperationPage/OperationPage';

import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { useRecoilValue, useRecoilState } from 'recoil';

export default function OperationsSidebar() {

  const [showSidebarState, setShowSidebarState] = useRecoilState(showTransactionOperationsSidebarState);
  const transactionOperation = useRecoilValue<string>(transactionOperationState);

  return (

    <Offcanvas
      show={showSidebarState}
      placement="end"
      onHide={() => {
        setShowSidebarState(false)
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