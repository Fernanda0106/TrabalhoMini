import './App.css'
//Pages
import Home from './pages'
import Cart from './pages/Cart'

//Components
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import HeroBanner from './components/HeroBanner'
import LoadingSpinner from './components/LoadingSpinner'
import Modal from './components/Modal'
import { CartProvider } from './components/CartContex'

//Admin
import AdminDashboard from './admin/Dashboard'
import ProductForm from './admin/ProductForm'
import ProductList from './admin/ProductList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Header />
          <HeroBanner/>
          <main style={{padding:"20px", minHeight:"70vh"}}>
            <Routes>
              <Route path='/' element={<Home/>} />

              <Route path='Cart' element={<Cart/>} />
              <Route path='/admin/dashboard' element={<AdminDashboard/>} />
              <Route path='/admin/products' element={<ProductList/>} />
              <Route path='/admin/products/new' element={<ProductForm/>} />
              <Route path='/admin/products/edit/:id' element={<ProductForm/>} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}