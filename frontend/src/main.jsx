import { createRoot } from 'react-dom/client'
import ShopContextProvider from '../Context/ShopContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>


)
