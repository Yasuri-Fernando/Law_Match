import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [lawyers, setLawyers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || false);
  const [userData, setuserData] = useState({}); // Initialize as an empty object

  const getLawyersData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/lawyer/list');
      if (data.success) {
        setLawyers(data.lawyers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    if (!token) return; // Prevent API call if token is not set
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
      if (data.success) {
        setuserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    lawyers,getLawyersData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setuserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getLawyersData();
  }, []); // Get lawyers data once on component mount

  useEffect(() => {
    if (token) {
      loadUserProfileData(); // Load user data when token is set
    } else {
      setuserData({}); // Clear user data if no token
    }
  }, [token]); // Run whenever `token` changes

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
