import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
            Pet Catalogue
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
              <Nav.Link as={Link} to="/pets" className="fw-semibold">My Pets</Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-semibold">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {children}
    </div>
  )
}

export default Layout