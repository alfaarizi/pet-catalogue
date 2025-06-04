import { useState, useEffect } from 'react'
import { Container, Table, Button, Alert, Spinner, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function PetsPage() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pets')
      const data = await response.json()
      
      if (data.success) {
        setPets(data.data)
      } else {
        setError('Failed to load pets')
      }
    } catch (error) {
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '-'
  const truncateNote = (note) => note ? (note.length > 50 ? note.substring(0, 50) + '...' : note) : '-'

  // Calculate pet statistics
  const totalPets = pets.length
  const alivePets = pets.filter(pet => !pet.date_of_death).length

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">Loading pets...</p>
    </Container>
  )

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger" className="text-center">{error}</Alert>
    </Container>
  )

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: '#bb86fc' }}>
          My Pets ({alivePets}/{totalPets})
        </h1>
        <Button as={Link} to="/pets/add" variant="success" className="fw-semibold">
          + New Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No pets found. Add your first pet!</p>
        </div>
      ) : (
        <Table striped bordered hover variant="dark" responsive>
          <thead style={{ backgroundColor: '#0d6efd' }}>
            <tr>
              <th className="text-info fw-bold">Name</th>
              <th className="text-info fw-bold">Species</th>
              <th className="text-info fw-bold">Date of Birth</th>
              <th className="text-info fw-bold">Date of Death</th>
              <th className="text-center text-info fw-bold">Note</th>
              <th className="text-info fw-bold">Status</th>
              <th className="text-center text-info fw-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td className="fw-semibold text-light">{pet.name}</td>
                <td className="text-light">{pet.species}</td>
                <td className="text-light">{formatDate(pet.date_of_birth)}</td>
                <td className="text-light">{formatDate(pet.date_of_death)}</td>
                <td className="text-center text-light">{truncateNote(pet.note)}</td>
                <td>
                  <Badge bg={pet.date_of_death ? 'danger' : 'success'}>
                    {pet.date_of_death ? 'Deceased' : 'Alive'}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button as={Link} to={`/pets/edit/${pet.id}`} variant="outline-primary" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default PetsPage