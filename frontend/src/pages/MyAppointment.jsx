<<<<<<< Updated upstream
import React from 'react'

const MyAppointment = () => {
  return (
    <div>
      
=======
import React, { useContext } from 'react'
import { AppContext } from '../content/AppContext'
const MyAppointment = () => {

const {lawyers} = useContext(AppContext)
  
  return (
    <div>
      <p>My Appointments</p>
      <div>
        {lawyers.slice(0,2).map((item,index)=>(
          <div key={index}>
            <div>
              <img src={item.image} alt=""/>
            </div>
            <div>
              <P>{item.name}</P>
              <P>{item.speciality}</P>
              <P>Address:</P>
              <P>{item.address.line1}</P>
              <P>{item.address.line2}</P>
              <P><span>Date & Time:</span>25, July, 2024 | 8.30 PM</P>
            </div>
            <div>
              <button>Pay Online</button>
              <button>Cancel Appointment</button>
            </div>
          </div>
        ))}
        </div>
>>>>>>> Stashed changes
    </div>
  )
}

export default MyAppointment;
