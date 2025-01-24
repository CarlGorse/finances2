import Offcanvas from 'react-bootstrap/Offcanvas';
import OperationPage from './OperationPage';
import { transactionOperationState } from 'recoil/atoms/TransactionOperationAtom';
import { showTransactionOperationsSidebarState } from 'recoil/atoms/ShowTransactionOperationsSidebarState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import TransactionOperation from 'types/TransactionOperation'

export default function TransactionOperationsSidebar() {

  const [transactionOperation, setTransactionOperation] = useRecoilState<TransactionOperation>(transactionOperationState);
  const showTransactionOperationSidebarState = useRecoilValue(showTransactionOperationsSidebarState);
  const setShowTransactionOperationSidebarState = useSetRecoilState(showTransactionOperationsSidebarState);

  return (
    <Offcanvas
      show={showTransactionOperationSidebarState}
      placement="end"
      onHide={() => {
        setShowTransactionOperationSidebarState(false)
        //setTransactionOperation(null)
      }}
      style={{ backgroundColor: "cornsilk" }}
      scroll={true}
      backdrop={false}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{transactionOperation?.Description}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <OperationPage />
      </Offcanvas.Body>
    </Offcanvas>
  );
}