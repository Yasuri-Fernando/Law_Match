import { createContext } from "react";

export const AppContext = createContext(null);

    const currency = '$'

const AppContextProvider = ({ children }) => {
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();

        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            age--; // Adjust if the birthday hasn't occurred yet
        }

        return age;
    };

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        if (!slotDate || !slotDate.includes('_')) return "Invalid Date";  
        const dateArray = slotDate.split('_');
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
    };

    const value = {
        calculateAge,
        slotDateFormat,
        currency
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
