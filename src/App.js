import React from "react"
import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
const NotFound =React.lazy(()=>import('./components/NotFound'))
const ProductItems =React.lazy(()=>import('./components/ProductItems'))
const Cart =React.lazy(()=>import('./components/Cart'))
const LoginPage =React.lazy(()=>import('./components/LoginPage'))

const Home=React.lazy(()=>import('./components/Home'))
const Header=React.lazy(()=>import('./components/Header'))
const Contacts=React.lazy(()=>import('./components/Contacts'))
const ProtectedRoute=React.lazy(()=>import('./components/ProtectedRoute'))



const App=()=>{

  return(
    <div>
        <Router>
          <React.Suspense fallback={<p>Loading....</p>} >
          <Routes>
            <Route path="/" element={<div> <ProtectedRoute><Header/> <Home/> </ProtectedRoute></div>}  />
            <Route path="/contacts" element={<div> <ProtectedRoute><Header/> <Contacts/></ProtectedRoute> </div>}  />
            <Route path='/products/:id' element={<div> <ProtectedRoute><Header/><ProductItems/></ProtectedRoute> </div>} />
            <Route path='*' element={<div> <ProtectedRoute><Header/><NotFound/></ProtectedRoute> </div>} />
            <Route path='/cart' element={<div> <ProtectedRoute><Header/><Cart/></ProtectedRoute> </div>} />
            <Route path="/login" element={<LoginPage/>} />
          </Routes>
          </React.Suspense>
        </Router>
    </div>
  )
}

export default App