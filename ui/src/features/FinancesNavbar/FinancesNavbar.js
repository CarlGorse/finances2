import { Container, Nav, Navbar } from 'react-bootstrap';

function FinancesNavbar() {

  return (
    <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="./">Finances</Navbar.Brand>
        <Nav>
          <Nav.Link href="./transactions">Transactions</Nav.Link>
          <Nav.Link href="./category-totals-report">Category totals report</Nav.Link>
        </Nav>
      </Container>
    </Navbar >
  );
}

export default FinancesNavbar;
