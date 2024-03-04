import { Container, Navbar } from 'react-bootstrap';

function NavBar() {

  return (
    <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="./">Finances</Navbar.Brand>
      </Container>
    </Navbar >
  );
}

export default NavBar;
