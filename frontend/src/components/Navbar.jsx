import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../content/AppContext';

const Navbar = () => {
  const navigate = useNavigate()
  const {token,setToken,userData} = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }
  //const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" className="py-1">Home</NavLink>
        <NavLink to="/lawyers" className="py-1">All Lawyers</NavLink>
        <NavLink to="/about" className="py-1">About</NavLink>
        <NavLink to="/contact" className="py-1">Contact</NavLink>
      </ul>

      {/* User Profile & Menu */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            </div>
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-20">
              <div className="flex flex-col gap-4 p-4 text-gray-600">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="Menu" />

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed top-0 right-0 w-full h-screen bg-white z-20 transition-all">
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="Logo" />
              <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/" className="px-4 py-2 rounded inline-block hover:bg-gray-200 w-full text-center">Home</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/lawyers" className="px-4 py-2 rounded inline-block hover:bg-gray-200 w-full text-center">All Lawyers</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about" className="px-4 py-2 rounded inline-block hover:bg-gray-200 w-full text-center">About</NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact" className="px-4 py-2 rounded inline-block hover:bg-gray-200 w-full text-center">Contact</NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
