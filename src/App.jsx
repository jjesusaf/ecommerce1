import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchase from './pages/Purchase'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Container } from 'react-bootstrap'
import Footer from './pages/Footer'
function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <LoadingScreen />}
        <Container className='my-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/purchase' element={<Purchase />} />
          </Route>
        </Routes>
        </Container>
        <Footer/>
      </HashRouter>
    </div>
  )
}

export default App
