import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, ProductDetail, Login, Purchases } from './pages'
import { NavBar, LoadingScreen } from './components'
import { useSelector } from 'react-redux/es/exports'
import { Container } from "react-bootstrap";

import './styles.css'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}

      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
