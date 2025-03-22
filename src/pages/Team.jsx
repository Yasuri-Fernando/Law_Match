import { Github, Mail, Linkedin } from 'lucide-react';
import yasuriImage from '../assets/kinnara.jpg';
import janayaImage from '../assets/janaya.jpg';
import dinuliImage from '../assets/Dinuli.jpg';
import kaisImage from '../assets/kais.jpg';
import chathumiImage from '../assets/Chathumi.jpg';
 


const teamMembers = [
  {
    name: 'Yasuri Fernando',
    role: 'Backend Developer',
    image: yasuriImage,
    bio: 'Backend developer specializing in Flask, PyTorch, and Sentence-Transformers, focused on building scalable legal applications.',
    social: {
      github: 'https://github.com/Yasuri-Fernando',
      linkedin: 'https://www.linkedin.com/in/yasuri-fernando-83278a273/',
      email: 'yasurifernandoz@gmail.com',
      
    }
  },
  {
    name: 'Janaya Ransiluni',
    role: 'Backend Developer',
    image: janayaImage,
    bio: 'backend developer specializing in Flask, PyTorch, and Sentence-Transformers,spacy focused on building efficient and scalable server-side solutions for legal applications.',
    social: {
      github: 'https://github.com/janaya554',
      linkedin: 'https://www.linkedin.com/in/janaya-ransiluni-944b52295/',
      email: 'janayaransiluni6@gmail.com',
      
    }
  },
  {
    name: 'Dinuli Janithya',
    role: 'Fullstack Developer',
    image: dinuliImage,
    bio: 'A full-stack developer specializing in React, Node.js, and MongoDB, focused on building scalable web applications.',
    social: {
      github: 'https://github.com/Dinuli-02',
      linkedin: 'https://www.linkedin.com/in/dinuli-janithya-37aa442a2/',
      email: 'dinurajapaksha1216@gmail.com',
      
    }
  },
  {
    name: 'Ahmed Kais ',
    role: 'Frontend Developer',
    image: kaisImage,
    bio: 'A Front-End Developer  specializing in React, JavaScript, CSS and HTML, focused on designing and building web applications in modern ways',
    social: {
      github: 'https://github.com/ahmedkais',
      linkedin: 'https://www.linkedin.com/in/ahmed-kais-4a835b28b/',
      email: 'ahmedkais123456789@gmail.com',
      
    }
  },
  {
    name: 'Chathumi Rathnasekara',
    role: 'Fullstack Developer',
    image: chathumiImage,
    bio: 'A full-stack developer specializing in React, Node.js, and MongoDB, focused on building scalable web applications.',
    social: {
      github: 'https://github.com/chathumikethmini',
      linkedin: 'https://www.linkedin.com/in/chathumi-k-26ab44239/',
      email: 'kethminichathumi@gmail.com',
      
    }
  }
];

function SocialLink({ href, icon: Icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-black transition-colors duration-300"
    >
      <Icon size={20} />
    </a>
  );
}

function TeamMember({ member }) {
  return (
    <div className="w-60 bg-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative pt-8 px-8">
        <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden ring-4 ring-black">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="p-6 text-center ">
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-gray-600 font-medium mt-1">{member.role}</p>
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
          <p className="text-xl text-black max-w-2xl mx-auto">
            We are composed of passionate individuals who believe in making legal services more accessible, transparent, and efficient.
          </p>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} member={member} />
          ))}
        </div>
      </div>
    );
  }
  

export default Team;