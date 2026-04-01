import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Product from './Pages/Product'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import kids_banner from './assets/banner_kids.png'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import Checkout from './Pages/Checkout'
import MyOrders from './Pages/MyOrders'
import OrderSuccess from './Pages/OrderSuccess'
import { Payment } from './Pages/Payment'


function App() {

  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />

          <Route path='/product/:productId' element={<Product />} />

          <Route path='/collection' element={<ShopCategory category="collection" />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment/:amount' element={<Payment />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/order-success/:orderId' element={<OrderSuccess />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
