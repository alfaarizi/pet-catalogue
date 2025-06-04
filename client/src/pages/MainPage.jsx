import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap'

function MainPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPetStats()
  }, [])

  const fetchPetStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pets/stats')
      const data = await response.json()
      
      if (data.success) {
        setStats(data.data)
      } else {
        setError('Failed to load statistics')
      }
    } catch (error) {
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-5">
        <Col lg={8}>
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start">
              <h1 className="display-4 fw-bold mb-3" style={{ 
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Pet Catalogue</h1>
              <p className="lead text-light">
                Manage your pets' information and keep track of your beloved companions.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <div 
                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center shadow"
                style={{ width: '200px', height: '200px', fontSize: '5rem' }}
              >
                <span style={{ color: '#0d6efd' }}>🐾</span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="bg-secondary bg-opacity-25 border border-secondary rounded-3 p-3 mb-3 text-center">
            <h2 className="fw-bold mb-0" style={{ color: '#bb86fc' }}>Your Pet Statistics</h2>
          </div>
          
          <Card bg="dark" border="secondary" className="text-center">
            <Card.Body className="p-4">
              {loading && (
                <div className="py-3">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2 text-muted">Loading...</p>
                </div>
              )}
              
              {error && (
                <Alert variant="danger" className="mx-auto" style={{ maxWidth: '300px' }}>
                  {error}
                </Alert>
              )}
              
              {stats && (
                <div className="py-2">
                  <p className="fs-5 mb-2 text-light">
                    You have <span className="text-success fw-bold">{stats.living}</span> pets.
                  </p>
                  {stats.deceased > 0 && (
                    <p className="fs-5 text-light">
                      And you said goodbye to <span className="text-warning fw-bold">{stats.deceased}</span> pets.
                    </p>
                  )}
                  {stats.total === 0 && (
                    <p className="text-muted">No pets added yet.</p>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage