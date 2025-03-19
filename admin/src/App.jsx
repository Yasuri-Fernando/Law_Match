import React, {useContext} from 'react'
import Login from './pages/Lawyer/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { AppContext } from './context/AppContext';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddLawyer from './pages/Admin/AddLawyer';
import LawyersList from './pages/Admin/LawyersList';

const App = () => {

  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className = 'bg-[#F8F9FD]' >
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllApointments/>} />
          <Route path='/add-lawyer' element={<AddLawyer/>} />
          <Route path='/lawyer-list' element={<LawyersList/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <> 
      <Login/>
      <ToastContainer/>
    </>
  )
  
}

export default App
