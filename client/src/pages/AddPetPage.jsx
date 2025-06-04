import { useState } from 'react'
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function AddPetPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '', species: '', date_of_birth: '', note: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => navigate('/pets'), 1500)
      } else {
        setError('Failed to add pet. Please try again.')
      }
    } catch {
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const formStyle = {
    backgroundColor: '#343a40',
    color: '#fff',
    border: '1px solid #6c757d'
  }

  const placeholderStyle = `
    .custom-placeholder::placeholder { color: #adb5bd !important; opacity: 1; }
    .custom-placeholder::-webkit-input-placeholder { color: #adb5bd !important; }
    .custom-placeholder::-moz-placeholder { color: #adb5bd !important; }
  `

  if (success) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="success" className="mx-auto" style={{ maxWidth: '400px' }}>
          <h5>Pet added successfully!</h5>
          <p>Redirecting to pets list...</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <style>{placeholderStyle}</style>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold" style={{ color: '#bb86fc' }}>Add New Pet</h1>
            <Button as={Link} to="/pets" variant="warning" className="fw-semibold">
              Back to Pets
            </Button>
          </div>

          <Card bg="dark" border="secondary">
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {[
                  { name: 'name', label: 'Pet Name', placeholder: 'Enter pet name', required: true },
                  { name: 'species', label: 'Species', placeholder: 'e.g., Dog, Cat, Bird, Fish', required: true },
                  { name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true }
                ].map(field => (
                  <Form.Group key={field.name} className="mb-3">
                    <Form.Label className="text-light fw-semibold">
                      {field.label} {field.required && <span style={{ color: '#dc3545' }}>*</span>}
                    </Form.Label>
                    <Form.Control
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      style={formStyle}
                      className="custom-placeholder"
                    />
                  </Form.Group>
                ))}

                <Form.Group className="mb-4">
                  <Form.Label className="text-light fw-semibold">Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Add any notes about your pet (optional)"
                    style={formStyle}
                    className="custom-placeholder"
                  />
                </Form.Group>

                <div className="d-flex gap-3">
                  <Button type="submit" variant="success" disabled={loading} className="flex-fill fw-semibold">
                    {loading ? 'Adding Pet...' : 'Add Pet'}
                  </Button>
                  <Button
                    as={Link}
                    to="/pets"
                    variant="outline-secondary"
                    disabled={loading}
                    className="flex-fill cancel-btn"
                    style={{
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#dc3545'
                      e.target.style.borderColor = '#dc3545'
                      e.target.style.color = 'white'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.borderColor = '#6c757d'
                      e.target.style.color = '#6c757d'
                    }}
                  >
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

export default AddPetPage