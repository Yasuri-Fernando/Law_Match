import axios from "axios";
import {createContext, useState} from "react";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {


    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [lawyers,setLawyers] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

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
    
    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})

            if (data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (userId, appointmentId) => {
        try {
            console.log("Canceling appointment:", { userId, appointmentId }); // Debugging log
    
            const { data } = await axios.post(
                backendUrl + "/api/admin/cancel-appointment",
                { userId, appointmentId }, 
                { headers: { aToken } }
            );
    
            if (data.success) {
                toast.success(data.message);
                getAllAppointments(); // Refresh the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error in cancelAppointment:", error);
            toast.error(error.message);
        }
    };
    
    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})

            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,setAToken,
        backendUrl,lawyers,
        getAllLawyers,changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider