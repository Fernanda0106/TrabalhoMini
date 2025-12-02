import './App.css'
//Pages
import Home from './pages'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'

//Components
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import HeroBanner from './components/HeroBanner'
import LoadingSpinner from './components/LoadingSpinner'
import Modal from './components/Modal'

//Admin
import AdminDashboard from './admin/Dashboard'
import ProductForm from './admin/ProductForm'
import ProductList from './admin/ProductList'
import {CartProvider}  from './Context/CartContex'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//context
import  AuthProvider  from './Context/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <HeroBanner/>
            <main style={{padding:"20px", minHeight:"70vh"}}>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/cart' element={<Cart/>} />
                <Route path='/product/:id' element={<ProductDetails/>} />
                <Route path='/checkout' element={<Checkout/>} />
                <Route path='/admin/dashboard' element={<AdminDashboard/>} />
                <Route path='/admin/products' element={<ProductList/>} />
                <Route path='/admin/products/new' element={<ProductForm/>} />
                <Route path='/admin/products/edit/:id' element={<ProductForm/>} />
              </Routes>
            </main>
            <Footer/>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}