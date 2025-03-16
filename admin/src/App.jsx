import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { AppContext } from './context/AppContext';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';

const App = () => {

  const {aToken} = useContext(AdminContext)
  //localStorage.setItem('aToken', 'dummy_token');
  
  return aToken ? (
    <div className='bg-[#F8F9FD]' >
      
      <ToastContainer/>
      <Navbar />
      {!aToken && <Login />}
    </div>
  ) : (
    <> 
      <Login/>
      <ToastContainer/>
    </>
  )
  
}

export default App
