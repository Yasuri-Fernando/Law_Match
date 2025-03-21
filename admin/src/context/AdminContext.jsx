import axios from "axios";
import {createContext, useState} from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {


    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [lawyers,setLawyers] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const getAllLawyers = async () => {
       try{
            const {data} = await axios.post(backendUrl + '/api/admin/all-lawyers', {}, {headers:{aToken}})
            if(data.success){
                setLawyers(data.lawyers)
                console.log(data.lawyers);
            } else{
                toast.error(data.message)
            }
       }catch (error) {
            toast.error(error.message)

       } 
    }

    const changeAvailability = async (lawId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { lawId }, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllLawyers() // Refresh the list of lawyers after changing availability
            } else {
                toast.error(data.message);
            }
        } catch (error) {  // Add the error parameter here
            toast.error(error.message);  // Now the error is correctly handled
        }
    };
    

    const value = {
        aToken,setAToken,
        backendUrl,lawyers,
        getAllLawyers,changeAvailability,

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider