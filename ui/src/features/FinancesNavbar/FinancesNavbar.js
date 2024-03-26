import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function FinancesNavbar() {

  return (
    <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="./">Finances</Navbar.Brand>
        <Nav>
          <Nav.Link href="./transactions">Transactions</Nav.Link>
          <NavDropdown title="Reports">
            <NavDropdown.Item href="./category-totals-report">
              Category totals report
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar >
  );
}

export default FinancesNavbar;
