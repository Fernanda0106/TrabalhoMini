import './App.css'
//Pages
import Home from './pages'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'

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
   
          <main style={{padding:"20px", minHeight:"70vh"}}>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/product/:id' element={<ProductDetails/>} />
              <Route path='/Cart' element={<Cart/>} />
              <Route path='/admin/dashboard' element={<AdminDashboard/>} />
              <Route path= '/products' element={<ProductList/>} />
              <Route path='/admin/products/new' element={<ProductForm/>} />
              <Route path='/admin/products/edit/:id' element={<ProductForm/>} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}