import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[lawyers,setLawyers] = useState([])
    
    const value = {
        lawyers,
        currencySymbol
    }

    const getlawyersData = async () => {
        try{

            const {data} = await axios.get(backendUrl  + '/api/lawyer/list')
            if (data.success) {
                setLawyers(data.lawyers)

            }

        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getlawyersData()
    },[])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider