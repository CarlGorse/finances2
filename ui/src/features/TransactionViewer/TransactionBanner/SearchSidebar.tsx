import BankAccountSelector from '../SearchSidebar/BankAccountSelector';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PageSizeSelector from '../SearchSidebar/PageSizeSelector';
import YearsAndPeriodsSearch from '../SearchSidebar/YearsAndPeriodsSearch';

export default function SearchSidebar({ show, setShow }) {

  return (
    <Offcanvas
      show={show}
      placement="end"
      onHide={() => setShow(false)}
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