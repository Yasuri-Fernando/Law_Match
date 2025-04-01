import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../content/AppContext';
import RelatedLawyers from '../components/RelatedLawyers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Appointment = () => {
  const { lawId } = useParams();
  const { lawyers, currencySymbol, backendUrl, token, getLawyersData, userData} = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigate = useNavigate()

  const [lawInfo, setLawInfo] = useState(null);
  const [lawSlots, setLawSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchLawInfo = async () => {
    const lawInfo = lawyers.find(law => law._id === lawId);
    setLawInfo(lawInfo);
  };

  const getAvailableSlots = async () => {
    setLawSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day +"_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = lawInfo.slots_booked[slotDate] && lawInfo.slots_booked[slotDate].includes(slotTime) ? false:true

        if (isSlotAvailable) {
          //add sot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })
        }

        

        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setLawSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment');
      return navigate('/login');
    }

    if (!userData || !userData._id || !userData.name || !userData.email) {
      toast.error('User data is missing');
      return;
    }
  
    try {
      const date = lawSlots[slotIndex][0].datetime
  
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day +"_" + month + "_" + year
      
  
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { 
          
          lawId, 
          slotDate, 
          slotTime 
         
          
        },
        { headers: { token } }
      )
  
      if (data.success) {
        toast.success(data.message)
        getLawyersData()
        navigate('/my-appointments');
      } else {
        toast.error(data.message)
      }
  
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  



  useEffect(() => {
    const fetchData = async () => {
      await fetchLawInfo();
    };
    fetchData();
  }, [lawyers, lawId]);

  useEffect(() => {
    if (lawInfo) {
      getAvailableSlots();
    }
  }, [lawInfo]);

  useEffect(() => {
    console.log(lawSlots);
  }, [lawSlots]);

  return (
    lawInfo && (
      <div>
        {/* lawyer Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={lawInfo.image} alt="" />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {lawInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{lawInfo.degree} - {lawInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-x5 rounded-full">{lawInfo.experience}</button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{lawInfo.about}</p>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee: <span className="text-gray-600">{currencySymbol}{lawInfo.fees}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking slots */}
        <div className="sm-ml-72 sm-pl-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'> 
           
            {lawSlots.length > 0 && lawSlots.map((item, index) => (
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border'}`} 
              key={index}
            >
            
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {lawSlots.length > 0 && lawSlots[slotIndex].map((item,index)=>(
              <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>  

                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book An Appointment</button>
        </div>
        <div>
          {/* Listing Lawyers */ }
          <RelatedLawyers lawId={lawId}  speciality={lawInfo.speciality}/>
        </div>
      </div>
    )
  );
};

export default Appointment;
