import { useState } from 'react'
import { Container, Navbar, Nav, Button, Badge } from 'react-bootstrap'
import './App.css'

function App() {
  const [connected, setConnected] = useState(false)

  const testAPI = async () => {
    try {
      await fetch('http://localhost:8000/api/status')
      setConnected(true)
      setTimeout(() => setConnected(false), 2000)
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary">
        <Container>
          <Navbar.Brand className="fw-bold fs-3">🐾 Pet Catalogue</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link className="fw-semibold">Home</Nav.Link>
              <Nav.Link className="fw-semibold">My Pets</Nav.Link>
              <Nav.Link className="fw-semibold">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5 text-center">
        <h1 className="display-4 fw-bold mb-4">
          Manage Your <span className="text-primary">Pets</span>
        </h1>
        <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          Keep track of your beloved companions with our simple and elegant pet management system
        </p>
        
        <div className="d-flex gap-3 justify-content-center mb-3">
          <Button variant="primary" size="lg" onClick={() => alert('Pet Catalogue will be available soon! 🐾')}>
            Get Started
          </Button>
          <Button variant="outline-light" size="lg" onClick={testAPI}>
            {connected ? '✓ Connected' : 'Test API'}
          </Button>
        </div>

        {connected && <Badge bg="success" className="px-3 py-2 fs-6">🚀 Backend Ready!</Badge>}
      </Container>
    </div>
  )
}

export default App