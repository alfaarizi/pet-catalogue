import { useState, useEffect } from 'react'
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditPetPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '', species: '', date_of_birth: '', date_of_death: '', note: ''
  })

  useEffect(() => { fetchPet() }, [id])

  const fetchPet = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/pets/${id}`)
      const data = await response.json()
      
      if (data.success) {
        const pet = data.data
        setFormData({
          name: pet.name || '',
          species: pet.species || '',
          date_of_birth: pet.date_of_birth?.split('T')[0] || '',
          date_of_death: pet.date_of_death?.split('T')[0] || '',
          note: pet.note || ''
        })
      } else {
        setError('Failed to load pet data')
      }
    } catch {
      setError('Unable to connect to server')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:8000/api/pets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date_of_death: formData.date_of_death || null })
      })

      const data = await response.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => navigate('/pets'), 1500)
      } else {
        setError('Failed to update pet')
      }
    } catch {
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const formFields = [
    { name: 'name', label: 'Pet Name', required: true },
    { name: 'species', label: 'Species', required: true },
    { name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
    { name: 'date_of_death', label: 'Date of Death', type: 'date' }
  ]

  if (fetchLoading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">Loading pet data...</p>
    </Container>
  )

  if (success) return (
    <Container className="py-5 text-center">
      <Alert variant="success" className="mx-auto" style={{ maxWidth: '400px' }}>
        <h5>Pet updated successfully!</h5>
        <p>Redirecting to pets list...</p>
      </Alert>
    </Container>
  )

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold" style={{ color: '#bb86fc' }}>Edit Pet</h1>
            <Button as={Link} to="/pets" variant="warning" className="fw-semibold">
              Back to Pets
            </Button>
          </div>

          <Card bg="dark" border="secondary">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {formFields.map(field => (
                  <Form.Group key={field.name} className="mb-3">
                    <Form.Label className="text-light fw-semibold">{field.label}</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        required={field.required}
                        className="bg-dark text-light border-secondary"
                      />
                      {field.name === 'date_of_death' && formData.date_of_death && (
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          onClick={() => setFormData({ ...formData, date_of_death: '' })}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </Form.Group>
                ))}

                <Form.Group className="mb-4">
                  <Form.Label className="text-light fw-semibold">Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="note"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>

                <div className="d-flex gap-3">
                  <Button type="submit" variant="primary" disabled={loading} className="flex-fill fw-semibold">
                    {loading ? 'Updating...' : 'Update Pet'}
                  </Button>
                  <Button as={Link} to="/pets" variant="outline-secondary" disabled={loading} className="flex-fill">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default EditPetPage