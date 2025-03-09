// NGO Database for Sri Lanka
// This file contains a comprehensive database of NGOs in Sri Lanka

export interface NGO {
    id: string;
    name: string;
    category: string;
    focus: string[];
    description: string;
    website?: string;
    contact?: string;
    address?: string;
    established?: string;
    logo?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }
  
  // Main NGO Database
  export const sriLankaNGOs: NGO[] = [
    // Legal and Human Rights NGOs
    {
      id: '1',
      name: 'Law & Society Trust (LST)',
      category: 'Legal Rights',
      focus: ['Human Rights', 'Legal Research', 'Access to Justice'],
      description: 'Research and advocacy organization focused on legal and human rights issues in Sri Lanka.',
      website: 'https://www.lstlanka.org',
      contact: '+94 11 2684845',
      address: 'No. 3, Kynsey Terrace, Colombo 8',
      established: '1982',
      coordinates: { lat: 6.9100, lng: 79.8700 }
    },
    {
      id: '2',
      name: 'Centre for Policy Alternatives (CPA)',
      category: 'Legal Rights',
      focus: ['Constitutional Law', 'Public Interest Litigation', 'Governance'],
      description: 'Independent organization committed to programs of research and advocacy through which public policy is critiqued and alternatives identified.',
      website: 'https://www.cpalanka.org',
      contact: '+94 11 2565304',
      address: 'No. 6/5, Layards Road, Colombo 5',
      established: '1996',
      coordinates: { lat: 6.8950, lng: 79.8650 }
    },
    {
      id: '3',
      name: 'INFORM Human Rights Documentation Centre',
      category: 'Human Rights',
      focus: ['Human Rights Documentation', 'Legal Aid', 'Advocacy'],
      description: 'Monitors and documents human rights violations in Sri Lanka and provides legal assistance to victims.',
      website: 'https://www.inform.lk',
      contact: '+94 11 2809467',
      address: 'No. 5, Sulaiman Terrace, Colombo 5',
      established: '1990',
      coordinates: { lat: 6.8980, lng: 79.8670 }
    },
    {
      id: '4',
      name: 'Legal Aid Commission of Sri Lanka',
      category: 'Legal Aid',
      focus: ['Access to Justice', 'Legal Representation', 'Legal Awareness'],
      description: 'Government-established commission providing free legal assistance to underprivileged citizens.',
      website: 'https://www.legalaid.gov.lk',
      contact: '+94 11 2433618',
      address: 'No. 129, Hulftsdorp Street, Colombo 12',
      established: '1978',
      coordinates: { lat: 6.9370, lng: 79.8580 }
    },
    {
      id: '5',
      name: 'Women In Need (WIN)',
      category: 'Women\'s Legal Rights',
      focus: ['Gender-based Violence', 'Legal Aid for Women', 'Advocacy'],
      description: 'Dedicated to addressing issues of domestic violence, rape, and child abuse through crisis intervention and legal advocacy.',
      website: 'https://www.winsl.net',
      contact: '+94 11 2671411',
      address: 'No. 5, Rajakeeya Mawatha, Colombo 7',
      established: '1987',
      coordinates: { lat: 6.9150, lng: 79.8700 }
    },
    
    // Development NGOs
    {
      id: '6',
      name: 'Sarvodaya Shramadana Movement',
      category: 'Development',
      focus: ['Community Development', 'Education', 'Health', 'Microfinance'],
      description: 'One of Sri Lanka\'s largest NGOs focusing on holistic development through community participation and self-help initiatives.',
      website: 'https://www.sarvodaya.org',
      contact: '+94 11 2655255',
      address: 'No. 98, Rawatawatte Road, Moratuwa',
      established: '1958',
      logo: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      coordinates: { lat: 6.9300, lng: 79.8800 }
    },
    {
      id: '7',
      name: 'Foundation of Goodness',
      category: 'Humanitarian',
      focus: ['Rural Development', 'Education', 'Sports', 'Disaster Relief'],
      description: 'Works to bridge the gap between urban and rural communities by providing essential services and opportunities to rural villages.',
      website: 'https://www.fogsl.org',
      contact: '+94 11 2545362',
      address: 'No. 30, De Fonseka Road, Colombo 5',
      established: '1999',
      coordinates: { lat: 6.9000, lng: 79.8600 }
    },
    {
      id: '8',
      name: 'Sevalanka Foundation',
      category: 'Development',
      focus: ['Sustainable Agriculture', 'Environmental Conservation', 'Livelihood Development'],
      description: 'Focuses on sustainable development through community-based organizations.',
      website: 'https://www.sevalanka.org',
      contact: '+94 11 2545362',
      address: 'No. 432A, Colombo Road, Boralesgamuwa',
      established: '1993',
      coordinates: { lat: 6.8400, lng: 79.9000 }
    },
    {
      id: '9',
      name: 'Berendina Development Services',
      category: 'Development',
      focus: ['Microfinance', 'Enterprise Development', 'Vocational Training'],
      description: 'Works to reduce poverty through microfinance, enterprise development, and capacity building.',
      website: 'https://www.berendina.org',
      contact: '+94 11 4545580',
      address: 'No. 44/3, Narahenpita Road, Nawala',
      established: '1987',
      coordinates: { lat: 6.8750, lng: 79.8900 }
    },
    
    // International NGOs
    {
      id: '10',
      name: 'CARE International Sri Lanka',
      category: 'International',
      focus: ['Humanitarian Aid', 'Disaster Response', 'Economic Development'],
      description: 'Works to save lives, defeat poverty, and achieve social justice through various programs.',
      website: 'https://www.care.org/country/sri-lanka',
      contact: '+94 11 2683250',
      address: 'No. 8, Kinross Avenue, Colombo 4',
      established: '1950',
      coordinates: { lat: 6.8900, lng: 79.8550 }
    },
    {
      id: '11',
      name: 'Save the Children Sri Lanka',
      category: 'International',
      focus: ['Child Rights', 'Education', 'Health', 'Child Protection'],
      description: 'Works to improve the lives of children through better education, health care, and economic opportunities.',
      website: 'https://srilanka.savethechildren.net',
      contact: '+94 11 2580475',
      address: 'No. 18, Sinsapa Road, Colombo 6',
      established: '1974',
      coordinates: { lat: 6.8950, lng: 79.8580 }
    },
    {
      id: '12',
      name: 'World Vision Sri Lanka',
      category: 'International',
      focus: ['Child Sponsorship', 'Community Development', 'Disaster Response'],
      description: 'Christian humanitarian organization dedicated to working with children, families, and communities to overcome poverty and injustice.',
      website: 'https://www.worldvision.lk',
      contact: '+94 11 2691233',
      address: 'No. 619/8, Dr. Danister De Silva Mawatha, Colombo 9',
      established: '1977',
      coordinates: { lat: 6.9400, lng: 79.8700 }
    },
    {
      id: '13',
      name: 'Oxfam Sri Lanka',
      category: 'International',
      focus: ['Poverty Reduction', 'Gender Justice', 'Humanitarian Response'],
      description: 'Works to find practical, innovative ways for people to lift themselves out of poverty and thrive.',
      website: 'https://www.oxfam.org/en/countries/sri-lanka',
      contact: '+94 11 2584887',
      address: 'No. 15, Rohini Road, Colombo 6',
      established: '1968',
      coordinates: { lat: 6.8980, lng: 79.8620 }
    },
    {
      id: '14',
      name: 'Handicap International Sri Lanka',
      category: 'Disability Rights',
      focus: ['Disability Inclusion', 'Rehabilitation', 'Accessibility'],
      description: 'Works to improve the quality of life of people with disabilities and vulnerable populations.',
      website: 'https://www.hi.org/en/country/sri-lanka',
      contact: '+94 11 2716663',
      address: 'No. 24, Rajamalwatta Road, Battaramulla',
      established: '1992',
      coordinates: { lat: 6.9000, lng: 79.9200 }
    },
    {
      id: '15',
      name: 'ZOA Sri Lanka',
      category: 'International',
      focus: ['Livelihood Support', 'Water & Sanitation', 'Disaster Response'],
      description: 'Supports people who suffer due to armed conflict and natural disasters, by helping them rebuild their livelihoods.',
      website: 'https://www.zoa-international.com/sri-lanka',
      contact: '+94 11 2866756',
      address: 'No. 46/5, Nawala Road, Nugegoda',
      established: '1995',
      coordinates: { lat: 6.8720, lng: 79.8880 }
    },
    {
      id: '16',
      name: 'Practical Action Sri Lanka',
      category: 'International',
      focus: ['Technology', 'Climate Change', 'Disaster Risk Reduction'],
      description: 'Uses technology to challenge poverty by building the capabilities of poor communities.',
      website: 'https://practicalaction.org/where-we-work/sri-lanka',
      contact: '+94 11 2829412',
      address: 'No. 5, Lionel Edirisinghe Mawatha, Colombo 5',
      established: '1986',
      coordinates: { lat: 6.8950, lng: 79.8700 }
    },
    
    // Human Rights NGOs
    {
      id: '17',
      name: 'Human Rights Commission of Sri Lanka',
      category: 'Human Rights',
      focus: ['Human Rights Protection', 'Investigation', 'Education'],
      description: 'Independent commission to promote and protect human rights in Sri Lanka.',
      website: 'https://www.hrcsl.lk',
      contact: '+94 11 2505451',
      address: 'No. 14, R.A. De Mel Mawatha, Colombo 4',
      established: '1996',
      coordinates: { lat: 6.8900, lng: 79.8580 }
    },
    {
      id: '18',
      name: 'Transparency International Sri Lanka',
      category: 'Governance',
      focus: ['Anti-Corruption', 'Legal Reform', 'Right to Information'],
      description: 'Works to combat corruption and promote transparency, accountability, and integrity in laws and institutions.',
      website: 'https://www.tisrilanka.org',
      contact: '+94 11 2501474',
      address: 'No. 5/1, Elibank Road, Colombo 5',
      established: '2002',
      coordinates: { lat: 6.9050, lng: 79.8670 }
    },
    {
      id: '19',
      name: 'EQUAL GROUND',
      category: 'LGBTIQ Rights',
      focus: ['LGBTIQ Rights', 'Legal Advocacy', 'Human Rights'],
      description: 'Human rights organization seeking equality for the LGBTIQ community in Sri Lanka.',
      website: 'https://www.equal-ground.org',
      contact: '+94 11 2512977',
      address: 'Colombo',
      established: '2004',
      coordinates: { lat: 6.9270, lng: 79.8610 }
    },
    {
      id: '20',
      name: 'Home for Human Rights (HHR)',
      category: 'Human Rights',
      focus: ['Legal Aid', 'Human Rights Documentation', 'Advocacy'],
      description: 'Provides legal assistance to victims of human rights violations and works on human rights documentation.',
      contact: '+94 11 2552544',
      address: 'Colombo',
      established: '1995',
      coordinates: { lat: 6.9200, lng: 79.8650 }
    },
    {
      id: '21',
      name: 'Rights Now Collective for Democracy',
      category: 'Human Rights',
      focus: ['Democracy', 'Rule of Law', 'Human Rights Education'],
      description: 'Works to strengthen democracy, rule of law, and human rights in Sri Lanka.',
      website: 'https://www.rightsnow.net',
      contact: '+94 11 2375178',
      address: 'Colombo',
      established: '1997',
      coordinates: { lat: 6.9180, lng: 79.8640 }
    },
    
    // Environmental NGOs
    {
      id: '22',
      name: 'Centre for Environmental Justice (CEJ)',
      category: 'Environmental Law',
      focus: ['Environmental Protection', 'Legal Advocacy', 'Public Interest Litigation'],
      description: 'Dedicated to ensuring environmental justice for communities through legal action and advocacy.',
      website: 'https://www.ejustice.lk',
      contact: '+94 11 2683282',
      address: 'No. 20A, Kuruppu Road, Colombo 8',
      established: '2004',
      coordinates: { lat: 6.9250, lng: 79.8780 }
    },
    {
      id: '23',
      name: 'Sri Lanka Wildlife Conservation Society',
      category: 'Environmental',
      focus: ['Wildlife Protection', 'Conservation', 'Environmental Education'],
      description: 'Dedicated to the conservation of Sri Lanka\'s wildlife and natural habitats.',
      website: 'https://www.slwcs.org',
      contact: '+94 77 3544638',
      address: 'No. 215/1, Attidiya Road, Dehiwala',
      established: '1995',
      coordinates: { lat: 6.8500, lng: 79.8700 }
    },
    {
      id: '24',
      name: 'Janathakshan',
      category: 'Environmental',
      focus: ['Sustainable Energy', 'Green Technology', 'Climate Action'],
      description: 'Promotes sustainable and green solutions for energy, water, and waste management.',
      website: 'https://www.janathakshan.lk',
      contact: '+94 11 2829412',
      address: 'No. 5, Lionel Edirisinghe Mawatha, Colombo 5',
      established: '2011',
      coordinates: { lat: 6.8940, lng: 79.8690 }
    },
    
    // Health NGOs
    {
      id: '25',
      name: 'Family Planning Association of Sri Lanka',
      category: 'Health',
      focus: ['Sexual Health', 'Reproductive Rights', 'Family Planning'],
      description: 'Provides sexual and reproductive health services and education across Sri Lanka.',
      website: 'https://www.fpasrilanka.org',
      contact: '+94 11 2584157',
      address: 'No. 37/27, Bullers Lane, Colombo 7',
      established: '1953',
      coordinates: { lat: 6.9130, lng: 79.8640 }
    },
    {
      id: '26',
      name: 'Family Rehabilitation Centre (FRC)',
      category: 'Psychosocial & Legal Support',
      focus: ['Trauma Counseling', 'Legal Support', 'Human Rights'],
      description: 'Provides psychosocial support and legal assistance to victims of torture and trauma.',
      website: 'https://www.frcsl.org',
      contact: '+94 11 2685980',
      address: 'No. 183/3, Nawala Road, Nugegoda',
      established: '1992',
      coordinates: { lat: 6.8850, lng: 79.8880 }
    },
    
    // Children's NGOs
    {
      id: '27',
      name: 'Child Fund Sri Lanka',
      category: 'Children',
      focus: ['Child Protection', 'Education', 'Health', 'Youth Empowerment'],
      description: 'Works to create lasting change in the lives of children and youth, their families, and communities.',
      website: 'https://www.childfund.org/sri-lanka',
      contact: '+94 11 2558933',
      address: 'No. 252, Elvitigala Mawatha, Colombo 8',
      established: '1985',
      coordinates: { lat: 6.9100, lng: 79.8750 }
    },
    {
      id: '28',
      name: 'LEADS Sri Lanka',
      category: 'Children',
      focus: ['Child Protection', 'Education', 'Psychosocial Support'],
      description: 'Christian organization working to meet the development and protection needs of children.',
      website: 'https://www.leads.lk',
      contact: '+94 11 2659112',
      address: 'No. 25, Hospital Road, Dehiwala',
      established: '1983',
      coordinates: { lat: 6.8550, lng: 79.8650 }
    },
    
    // Disability NGOs
    {
      id: '29',
      name: 'Navajeevana',
      category: 'Disability Rights',
      focus: ['Rehabilitation', 'Inclusive Education', 'Livelihood Development'],
      description: 'Works to improve the quality of life of people with disabilities in rural communities.',
      website: 'https://www.navajeevana.org',
      contact: '+94 47 2240175',
      address: 'Tangalle Road, Kudawella, Hambantota',
      established: '1987',
      coordinates: { lat: 6.1800, lng: 81.1200 }
    },
    {
      id: '30',
      name: 'Sunera Foundation',
      category: 'Disability Rights',
      focus: ['Performing Arts', 'Disability Inclusion', 'Therapy'],
      description: 'Uses performing arts to empower persons with disabilities and promote social inclusion.',
      website: 'https://www.sunerafoundation.org',
      contact: '+94 11 2595625',
      address: 'No. 18, Amarasekara Mawatha, Colombo 5',
      established: '2000',
      coordinates: { lat: 6.8950, lng: 79.8650 }
    },
    {
      id: '31',
      name: 'Centre for Disability Research, Education and Practice (CDREP)',
      category: 'Disability Rights',
      focus: ['Disability Research', 'Inclusive Education', 'Advocacy'],
      description: 'Promotes the rights and inclusion of persons with disabilities through research and education.',
      website: 'https://www.cdrep.org',
      contact: '+94 11 2768282',
      address: 'No. 29, Maitland Place, Colombo 7',
      established: '2005',
      coordinates: { lat: 6.9120, lng: 79.8630 }
    },
    
    // Housing NGOs
    {
      id: '32',
      name: 'Habitat for Humanity Sri Lanka',
      category: 'Housing',
      focus: ['Affordable Housing', 'Community Development', 'Disaster Response'],
      description: 'Works to provide decent housing for families in need through construction and renovation projects.',
      website: 'https://www.habitatsrilanka.org',
      contact: '+94 11 2686076',
      address: 'No. 25, D.S. Senanayake Mawatha, Colombo 8',
      established: '1994',
      coordinates: { lat: 6.9200, lng: 79.8750 }
    },
    
    // Humanitarian NGOs
    {
      id: '33',
      name: 'Sri Lanka Red Cross Society',
      category: 'Humanitarian',
      focus: ['Disaster Response', 'Health', 'First Aid', 'Blood Donation'],
      description: 'Provides humanitarian services to vulnerable communities during disasters and normal times.',
      website: 'https://www.redcross.lk',
      contact: '+94 11 2691095',
      address: 'No. 106, Dharmapala Mawatha, Colombo 7',
      established: '1936',
      coordinates: { lat: 6.9120, lng: 79.8630 }
    },
    
    // Research NGOs
    {
      id: '34',
      name: 'Centre for Poverty Analysis (CEPA)',
      category: 'Research',
      focus: ['Poverty Reduction', 'Policy Research', 'Social Justice'],
      description: 'An independent research institution providing professional services on poverty and development issues.',
      website: 'https://www.cepa.lk',
      contact: '+94 11 2676955',
      address: 'No. 29, Gregory\'s Road, Colombo 7',
      established: '2001',
      coordinates: { lat: 6.9100, lng: 79.8650 }
    },
    
    // Regional NGOs
    {
      id: '35',
      name: 'Kandy Human Rights Office',
      category: 'Human Rights',
      focus: ['Legal Aid', 'Human Rights', 'Community Education'],
      description: 'Provides legal assistance and human rights education in the Kandy region.',
      contact: '+94 81 2234567',
      address: 'No. 45, Temple Street, Kandy',
      established: '1998',
      coordinates: { lat: 7.2950, lng: 80.6350 }
    },
    {
      id: '36',
      name: 'Kandy Association for Community Protection',
      category: 'Community Development',
      focus: ['Rural Development', 'Education', 'Health'],
      description: 'Works to improve living conditions in rural communities around Kandy.',
      contact: '+94 81 2234567',
      address: 'No. 45, Temple Street, Kandy',
      established: '1998',
      coordinates: { lat: 7.2920, lng: 80.6320 }
    },
    {
      id: '37',
      name: 'Galle Heritage Foundation',
      category: 'Cultural Heritage',
      focus: ['Heritage Preservation', 'Tourism', 'Education'],
      description: 'Dedicated to preserving the cultural and historical heritage of Galle Fort and surrounding areas.',
      website: 'https://www.galleheritage.org',
      contact: '+94 91 2234567',
      address: 'No. 28, Church Street, Galle Fort',
      established: '2005',
      coordinates: { lat: 6.0280, lng: 80.2170 }
    },
    {
      id: '38',
      name: 'Jaffna Rehabilitation Center',
      category: 'Rehabilitation',
      focus: ['Post-war Recovery', 'Mental Health', 'Livelihood Development'],
      description: 'Provides rehabilitation services and support for communities affected by the civil war.',
      contact: '+94 21 2234567',
      address: 'No. 56, Hospital Road, Jaffna',
      established: '2009',
      coordinates: { lat: 9.6650, lng: 80.0220 }
    },
    {
      id: '39',
      name: 'Jaffna Legal Aid Centre',
      category: 'Legal Aid',
      focus: ['Post-war Legal Assistance', 'Property Rights', 'Human Rights'],
      description: 'Provides legal assistance to communities in Northern Sri Lanka, particularly on post-war issues.',
      contact: '+94 21 2234567',
      address: 'No. 56, Hospital Road, Jaffna',
      established: '2009',
      coordinates: { lat: 9.6620, lng: 80.0240 }
    },
    {
      id: '40',
      name: 'Anuradhapura Heritage Protection Society',
      category: 'Cultural Heritage',
      focus: ['Heritage Preservation', 'Education', 'Community Development'],
      description: 'Works to protect and promote the ancient heritage sites of Anuradhapura.',
      contact: '+94 25 2234567',
      address: 'No. 34, Sacred City, Anuradhapura',
      established: '1995',
      coordinates: { lat: 8.3150, lng: 80.4100 }
    },
    {
      id: '41',
      name: 'Eastern Community Development Foundation',
      category: 'Development',
      focus: ['Post-war Recovery', 'Women\'s Empowerment', 'Education'],
      description: 'Supports community development and recovery in the Eastern Province.',
      contact: '+94 65 2234567',
      address: 'No. 78, Lake Road, Batticaloa',
      established: '2010',
      coordinates: { lat: 7.7300, lng: 81.7000 }
    },
    {
      id: '42',
      name: 'Eastern Legal Aid Centre',
      category: 'Legal Aid',
      focus: ['Legal Assistance', 'Women\'s Rights', 'Land Rights'],
      description: 'Provides legal aid services to vulnerable communities in Eastern Sri Lanka.',
      contact: '+94 65 2234567',
      address: 'No. 78, Lake Road, Batticaloa',
      established: '2010',
      coordinates: { lat: 7.7280, lng: 81.6980 }
    },
    {
      id: '43',
      name: 'PALM Foundation',
      category: 'Development',
      focus: ['Rural Development', 'Women\'s Empowerment', 'Youth Development'],
      description: 'Works to empower marginalized communities through sustainable development initiatives.',
      website: 'https://www.palmsl.org',
      contact: '+94 11 2823832',
      address: 'No. 567, Galle Road, Colombo 6',
      established: '1981',
      coordinates: { lat: 6.8800, lng: 79.8580 }
    },
    {
      id: '44',
      name: 'Eastern Self-Reliant Community Awakening Organization (ESCO)',
      category: 'Development',
      focus: ['Community Development', 'Peace Building', 'Women\'s Empowerment'],
      description: 'Works to improve the socio-economic conditions of vulnerable communities in Eastern Sri Lanka.',
      contact: '+94 65 2222797',
      address: 'No. 68, Main Street, Batticaloa',
      established: '1995',
      coordinates: { lat: 7.7260, lng: 81.7020 }
    },
    {
      id: '45',
      name: 'Viluthu Centre for Human Resource Development',
      category: 'Development',
      focus: ['Women\'s Empowerment', 'Governance', 'Peace Building'],
      description: 'Works to strengthen democratic governance and empower women in post-conflict areas.',
      website: 'https://www.viluthu.org',
      contact: '+94 11 2614274',
      address: 'No. 24, Horton Place, Colombo 7',
      established: '2003',
      coordinates: { lat: 6.9110, lng: 79.8620 }
    }
  ];
  
  // Filter functions for the NGO database
  
  // Get NGOs by category
  export const getNGOsByCategory = (category: string): NGO[] => {
    return sriLankaNGOs.filter(ngo => ngo.category === category);
  };
  
  // Get NGOs by focus area
  export const getNGOsByFocus = (focusArea: string): NGO[] => {
    return sriLankaNGOs.filter(ngo => ngo.focus.includes(focusArea));
  };
  
  // Get NGOs by district (searches address field)
  export const getNGOsByDistrict = (district: string): NGO[] => {
    const districtLower = district.toLowerCase();
    return sriLankaNGOs.filter(ngo => 
      ngo.address && ngo.address.toLowerCase().includes(districtLower)
    );
  };
  
  // Get NGOs by search term (searches name and description)
  export const searchNGOs = (term: string): NGO[] => {
    const searchTermLower = term.toLowerCase();
    return sriLankaNGOs.filter(ngo => 
      ngo.name.toLowerCase().includes(searchTermLower) || 
      ngo.description.toLowerCase().includes(searchTermLower)
    );
  };
  
  // Get all unique categories
  export const getAllCategories = (): string[] => {
    return Array.from(new Set(sriLankaNGOs.map(ngo => ngo.category))).sort();
  };
  
  // Get all unique focus areas
  export const getAllFocusAreas = (): string[] => {
    const allFocusAreas = sriLankaNGOs.flatMap(ngo => ngo.focus);
    return Array.from(new Set(allFocusAreas)).sort();
  };
  
  // Get NGOs with coordinates (for mapping)
  export const getNGOsWithCoordinates = (): NGO[] => {
    return sriLankaNGOs.filter(ngo => ngo.coordinates);
  };
  
  // Get law-related NGOs
  export const getLawRelatedNGOs = (): NGO[] => {
    const legalCategories = ['Legal Rights', 'Legal Aid', 'Human Rights', 'Women\'s Legal Rights'];
    const legalFocusAreas = ['Legal Aid', 'Legal Assistance', 'Legal Research', 'Legal Advocacy', 'Access to Justice', 'Human Rights'];
    
    return sriLankaNGOs.filter(ngo => 
      legalCategories.includes(ngo.category) || 
      ngo.focus.some(focus => legalFocusAreas.includes(focus))
    );
  };