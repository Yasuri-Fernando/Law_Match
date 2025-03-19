import React from 'react'
import { assets } from '../../assets/assets'


const AddLawyer = () => {
  return (
    <div>
      <form className='m-5 w-full'>
        <p className='mb-3 text-lg font-medium'>Add Lawyer</p>
        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
          <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor='law-img'>
              <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt=''/>
            </label>
              <input type='file' id='law-img' hidden/>
              <p>Upload lawyer <br/>picture</p>
          </div>

          <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'> 
              <div className='flex-1 flex-col gap-1'>
                <p>Lawyer Name</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='Name' required/>
              </div>

              <div className='flex-1 flex-col gap-1'>
                <p>Lawyer Email</p>
                <input className='border rounded px-3 py-2' type='email' placeholder='Email' required/>
              </div>

              <div className='flex-1 flex-col gap-1'>
                <p>Doctor Password</p>
                <input className='border rounded px-3 py-2' type='password' placeholder='Password' required/>
              </div>

              <div className='flex-1 flex-col gap-1'>
                <p>Experience</p>
                <select className='border rounded px-3 py-2' name='' id=''>
                  <option value= "1 Year">1 Year</option>
                  <option value= "2 Year">2 Year</option>
                  <option value= "3 Year">3 Year</option>
                  <option value= "4 Year">4 Year</option>
                  <option value= "5 Year">5 Year</option>
                  <option value= "6 Year">6 Year</option>
                  <option value= "7 Year">7 Year</option>
                  <option value= "8 Year">8 Year</option>
                  <option value= "9 Year">9 Year</option>
                  <option value= "10 Year">10 Year</option>
                </select>
              </div>

              <div className='flex-1 flex-col gap-1'>
                <p>Fees</p>
                <input className='border rounded px-3 py-2' type='number' placeholder='fees' required/>
              </div>
              

            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex-col gap-1'>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2' name='' id=''>
                <option value="property law"> Property Law</option>
                <option value="civil law">Civil Law</option>
                <option value="Family law">Family Law</option>
                <option value="International law">International Law</option>
                <option value="Criminal law">Criminal Law</option>
                <option value="human rights law">Human Rignts Law</option>
              </select>
            </div>
            </div>

            <div className='flex-1 flex-col gap-1'>
                <p>Education</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='Education' required/>
            </div>

            <div className='flex-1 flex-col gap-1'>
                <p>Address</p>
                <input className='border rounded px-3 py-2' type='text' placeholder='address 1' required/>
                <input className='border rounded px-3 py-2'type='text' placeholder='address 2' required/>
              </div>

              <div className='flex-1 flex-col gap-1'>
                <p className='mt-4 mb-2'>About</p>
                <textarea  className='border rounded px-3 py-2 border rounded'type='text' placeholder='write about lawyer' rows={5} required/>
            </div>

            <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add lawyer</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddLawyer
