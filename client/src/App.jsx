import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MainPage from './pages/MainPage'
import PetsPage from './pages/PetsPage'
import AboutPage from './pages/AboutPage'
import AddPetPage from './pages/AddPetPage'
import EditPetPage from './pages/EditPetPage'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/add" element={<AddPetPage />} />
          <Route path="/pets/edit/:id" element={<EditPetPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App