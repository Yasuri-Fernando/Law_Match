import React from 'react'
<<<<<<< Updated upstream
=======
import { assets } from '../assets/assets';
>>>>>>> Stashed changes

const About = () => {
  return (
    <div>
<<<<<<< Updated upstream
      
=======
     <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
    </div> 

    <div className='my-10 flex flex-col md:flex-row gap-12'>
      <img className='w-full md:max-w-[360px]' src = {assets.about_image} alt=''/>
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Welcome to LawMatch – your trusted partner in navigating the legal landscape with ease and efficiency. At LawMatch, we recognize the challenges individuals face when searching for the right legal assistance, whether it's for family matters, business disputes, or personal rights.</p>
        <p>LawMatch is dedicated to revolutionizing legal accessibility through technology. We continually enhance our platform, integrating innovative solutions to provide a seamless experience for users. Whether you're consulting a lawyer for the first time or managing ongoing legal needs, LawMatch is here to support you at every step.</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Our vision at LawMatch is to create a more connected and accessible legal system for everyone. We aim to bridge the gap between individuals and legal professionals, ensuring that quality legal assistance is just a few clicks away.</p>
      </div>
    </div>

    <div className='text-xl my-4'>
      <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
    </div>

    <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-black hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency</b>
        <p>A streamlined legal information platform that helps you quickly find the laws and legal professionals relevant to your needs.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-black hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Convinience</b>
        <p>Easy access to a comprehensive database of legal resources, categories, and expert guidance—all in one place.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-black hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Personalization</b>
        <p>Tailored legal content and expert recommendations based on your specific legal concerns.</p>
      </div>
    </div>
>>>>>>> Stashed changes
    </div>
  )
}

export default About;
