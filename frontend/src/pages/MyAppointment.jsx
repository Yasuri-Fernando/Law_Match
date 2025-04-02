import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../content/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const MyAppointment = () => {
  const { backendUrl, token, getLawyersData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]); 
  const [loadingPayment, setLoadingPayment] = useState(null);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };
  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error('Failed to load appointments');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getLawyersData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentpaypal = async (appointmentId) => {
    try {
      setLoadingPayment(appointmentId); // Set loading state
  
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-paypal`,
        { appointmentId },
        { headers: { token } }
      );
  
      // Log backend response for debugging
      console.log("Backend Payment Response:", data);
  
      // Ensure the response contains valid payment data
      if (!data.success || !data.order || !data.order.purchase_units || !data.order.purchase_units[0].amount.value) {
        throw new Error("Invalid payment data received.");
      }
  
      const containerId = `paypal-button-container-${appointmentId}`;
      document.getElementById(containerId).innerHTML = ""; // Clear previous buttons
  
      // Ensure PayPal SDK is loaded
      if (!window.paypal) {
        toast.error("PayPal SDK not loaded. Please refresh the page.");
        setLoadingPayment(null);
        return;
      }
  
      // Render PayPal button
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: data.order.purchase_units[0].amount.value }, // Pass the amount from backend
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            toast.success(`Payment Successful! Transaction ID: ${details.id}`);
            setLoadingPayment(null); // Reset loading state
          });
        },
        onError: (err) => {
          console.error(err);
          toast.error("Payment failed. Try again.");
          setLoadingPayment(null);
        },
      }).render(`#${containerId}`);
  
      // Reset loading state after button renders
      setTimeout(() => setLoadingPayment(null), 1000);
  
    } catch (error) {
      console.error(error);
      toast.error("Payment request failed.");
      setLoadingPayment(null);
    }
  };
  


  

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.lawData?.image} alt="Lawyer" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.lawData?.name}</p>
                <p>{item.lawData?.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.lawData?.address.line1 || 'N/A'}</p>
                <p className='text-xs'>{item.lawData?.address.line2 || 'N/A'}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{' '}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && (
                  <>
                    <button 
                      onClick={() => appointmentpaypal(item._id)} 
                      className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 rounded ${loadingPayment === item._id ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={loadingPayment === item._id}
                    >
                      {loadingPayment === item._id ? "Processing..." : "Pay Online"}
                    </button>
                    <div id={`paypal-button-container-${item._id}`} className="mt-2"></div>  
                  </>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 rounded '
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No appointments found.</p> 
        )}
      </div>
    </div>
  );
}

export default MyAppointment;
