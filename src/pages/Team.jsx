import { Github, Mail, Linkedin } from 'lucide-react';
import yasuriImage from '../assets/kinnara.jpg';
import janayaImage from '../assets/janaya.jpg';
import dinuliImage from '../assets/Dinuli.jpg';
import kaisImage from '../assets/kais.jpg';
import chathumiImage from '../assets/Chathumi.jpg';
 


const teamMembers = [
  {
    name: 'Yasuri Fernando',
    role: 'Team Leader',
    image: yasuriImage,
    bio: 'Full-stack developer with 5 years of experience in React and Node.js. Passionate about creating scalable web applications.',
    social: {
      github: '',
      linkedin: '',
      email: '',
      
    }
  },
  {
    name: 'Janaya Ransiluni',
    role: 'UI/UX Designer',
    image: janayaImage,
    bio: 'Creative designer focused on crafting beautiful and intuitive user experiences. Advocate for accessible design.',
    social: {
      github: '',
      linkedin: '',
      email: '',
      
    }
  },
  {
    name: 'Dinuli Janithya',
    role: 'Fullstack Developer',
    image: dinuliImage,
    bio: 'Database expert specializing in high-performance systems. Love solving complex architectural challenges.',
    social: {
      github: '',
      linkedin: '',
      email: '',
      
    }
  },
  {
    name: 'Ahmed Kais ',
    role: 'Frontend Developer',
    image: kaisImage,
    bio: 'Expert in legal technology solutions with a background in law. Focused on bridging technology and legal services.',
    social: {
      github: '',
      linkedin: '',
      email: '',
      
    }
  },
  {
    name: 'Chathumi Rathnasekara',
    role: 'Fullstack Developer',
    image: chathumiImage,
    bio: 'Experienced product manager specializing in legal tech products. Passionate about making legal services accessible to all.',
    social: {
      github: '',
      linkedin: '',
      email: '',
      
    }
  }
];

function SocialLink({ href, icon: Icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-black-600 transition-colors duration-300"
    >
      <Icon size={20} />
    </a>
  );
}

function TeamMember({ member }) {
  return (
    <div className="w-64 bg-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative pt-8 px-8">
        <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="p-6 text-center ">
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-black font-medium mt-1">{member.role}</p>
        <p className="text-gray-600 mt-3">{member.bio}</p>
        <div className="flex gap-4 mt-4">
          <SocialLink href={member.social.github} icon={Github} />
          <SocialLink href={member.social.linkedin} icon={Linkedin} />
          <SocialLink href={`mailto:${member.social.email}`} icon={Mail} />
          
        </div>
      </div>
    </div>
  );
}

function Team() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
        <p className="text-xl text-black-600 max-w-2xl mx-auto">
          We are composed of passionate individuals who believe in making legal services more accessible, transparent, and efficient.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Team;