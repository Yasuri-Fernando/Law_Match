import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import image from './image.png'
import Family_Law from './Dermatologist.svg'
import Human_rights_law from './Gastroenterologist.svg'
import Property_law from './General_physician.svg'
import Civil_law from './Gynecologist.svg'
import Criminal_law from './Neurologist.svg'
import International_law from './Pediatricians.svg'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Property law',
        image: Property_law
    },
    {
        speciality: 'Civil law',
        image: Civil_law
    },
    {
        speciality: 'Family law',
        image: Family_Law
    },
    {
        speciality: 'International law',
        image: International_law
    },
    {
        speciality: 'Criminal law',
        image: Criminal_law
    },
    {
        speciality: 'Human rights law',
        image: Human_rights_law
    },
]

export const lawyers = [
    {
        _id: 'doc1',
        name: 'Atty. John Peterson',
        image: image,
        speciality: 'Property law',
        degree: 'LLB, Property Law',
        experience: '8 Years',
        about: 'Atty. Peterson is dedicated to protecting the rights of his clients, specializing in criminal defense and ensuring fair legal representation.',
        fees: 100,
        address: {
            line1: '45th Street, Brooklyn',
            line2: 'New York, USA'
        }
    },
    {
        _id: 'doc2',
        name: 'Atty. Sarah Williams',
        image: image,
        speciality: 'Civil law',
        degree: 'LLB',
        experience: '3 Years',
        about: 'Atty. Williams has extensive experience in handling divorce, child custody, and family dispute cases with a focus on fair settlements.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Atty. Michael Anderson',
        image: image,
        speciality: 'Family law',
        degree: 'LLB',
        experience: '1 Years',
        about: 'Atty. Anderson provides expert legal guidance to businesses, handling corporate contracts, mergers, and compliance regulations.',
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Atty. Emily Roberts',
        image: image,
        speciality: 'International law',
        degree: 'LLB',
        experience: '2 Years',
        about: 'Atty. Roberts specializes in real estate transactions, helping clients with property disputes, contracts, and legal documentation.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Atty. David Brown',
        image: image,
        speciality: 'Criminal law',
        degree: 'LLB',
        experience: '4 Years',
        about: 'Atty. Brown assists individuals and businesses in navigating immigration laws, including visa applications and legal residency processes.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Atty. Andrew Williams',
        image: image,
        speciality: 'Human rights law',
        degree: 'LLB',
        experience: '4 Years',
        about: 'Atty. Andrew specializes in trademark, patent, and copyright law, helping businesses and individuals protect their intellectual property rights.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Atty. Christopher Davis',
        image: image,
        speciality: 'Civil law',
        degree: 'LLB',
        experience: '4 Years',
        about: 'Atty. Christopher provides expert legal advice on tax regulations, helping clients navigate tax disputes, deductions, and corporate tax planning.',
  fees: 140,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Atty. Timothy White',
        image: image,
        speciality: 'Property law',
        degree: 'LLB',
        experience: '3 Years',
        about: 'Atty.Timothy is an expert in labor laws, assisting employees and employers with workplace disputes, contracts, and discrimination cases.',
  fees: 95,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Atty. Ava Mitchell',
        image: image,
        speciality: 'Family Law',
        degree: 'LLM',
        experience: '1 Year',
        about: 'Atty. Ava specializes in cybersecurity regulations, data privacy, and cybercrime cases, ensuring businesses stay compliant with the law.',
        fees: 30,
        address: {
          line1: '37th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
        }
      },
      {
        _id: 'doc10',
        name: 'Atty. Jeffrey King',
        image: image,
        speciality: 'Entertainment Law',
        degree: 'LLM',
        experience: '2 Years',
        about: 'Atty. Jeffrey provides legal services for actors, musicians, and filmmakers, handling contracts, copyrights, and licensing deals.',
        fees: 145,
        address: {
          line1: '47th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
        }
      },
      {
        _id: 'doc11',
        name: 'Atty. Patrick Harris',
        image: image,
        speciality: 'Criminal law',
        degree: 'LLB',
        experience: '4 Years',
        about: 'Atty. Patrick is an expert in criminal defense, handling cases related to fraud, assault, and white-collar crimes.',
        fees: 50,
        address: {
          line1: '57th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
        }
      },
      {
        _id: 'doc12',
        name: 'Atty. Chloe Evans',
        image: image,
        speciality: 'Family law',
        degree: 'LLB',
        experience: '4 Years',
        about: 'Atty. Chloe specializes in family law matters, including divorce, child custody, and property settlements.',
        fees: 50,
        address: {
          line1: '17th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
        }
      },
      {
        _id: 'doc13',
        name: 'Atty. Ryan Martinez',
        image: image,
        speciality: 'Criminal law',
        degree: 'LLM',
        experience: '3 Years',
        about: 'Atty. Ryan advises businesses on mergers, acquisitions, and corporate compliance to ensure smooth operations.',
        fees: 60,
        address: {
          line1: '27th Cross, Richmond',
          line2: 'Circle, Ring Road, London'
        }
      }
]
export default assets;
