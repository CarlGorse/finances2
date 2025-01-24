import BankAccountSelector from './BankAccountSelector';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PageSizeSelector from './PageSizeSelector'
import { useRecoilState } from 'recoil'
import YearsAndPeriodsSearch from './YearsAndPeriodsSearch';
import { showSearchSidebarState } from 'recoil/atoms/ShowSearchSidebarState';

export default function TransactionBanner() {

  const [showSearchSidebar, setShowSearchSidebar] = useRecoilState(showSearchSidebarState);

  return (
    <Offcanvas
      show={showSearchSidebar}
      placement="end"
      onHide={() => setShowSearchSidebar(false)}
      style={{ backgroundColor: "cornsilk" }}
      scroll={true}
      backdrop={false}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <BankAccountSelector />

        <div className="mt-3">
          <YearsAndPeriodsSearch />
        </div>

        <div className="mt-3">
          <PageSizeSelector />
        </div>

      </Offcanvas.Body>
    </Offcanvas>
  );
}