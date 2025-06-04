import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import authorImage from '../assets/author.jpg'

function AboutPage() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card bg="dark" border="secondary" className="text-center">
            <Card.Body className="p-5">
              <h2 className="fw-bold mb-5" style={{ color: '#bb86fc' }}>About the Author</h2>
              
              <hr className="border-secondary opacity-50 mb-5" />
              
              <Image 
                src={authorImage} 
                alt="Author Profile"
                roundedCircle 
                className="mb-5 border border-light shadow"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              
              <hr className="border-secondary opacity-50 mb-4" />
              
              <div className="text-start mx-auto" style={{ maxWidth: '300px' }}>
                <h5 className="text-info">Name:</h5>
                <p className="text-light fs-5 mb-4">Muhammad Al Farizi</p>
                
                <h5 className="text-info">Neptun:</h5>
                <p className="text-light fs-5 mb-4">ocswom</p>
                
                <h5 className="text-info">Email Address:</h5>
                <p className="text-light fs-5 mb-0">ocswom@inf.elte.hu</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutPage