import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const courts = [
  {
    id: 1,
    name: 'Supreme Court of Sri Lanka',
    type: 'Supreme Court',
    address: 'Hulftsdorp Street, Colombo 12',
    contact: '+94 11 2433666',
    description: 'The highest and final superior court of record in Sri Lanka',
    district: 'Colombo'
  },
  {
    id: 2,
    name: 'Court of Appeal',
    type: 'Appellate Court',
    address: 'Superior Courts Complex, Colombo 12',
    contact: '+94 11 2433667',
    description: 'Second highest court that hears appeals from lower courts',
    district: 'Colombo'
  },
  {
    id: 3,
    name: 'Colombo High Court',
    type: 'High Court',
    address: 'Hulftsdorp Street, Colombo 12',
    contact: '+94 11 2433668',
    description: 'Major criminal cases and civil matters',
    district: 'Colombo'
  },
  {
    id: 4,
    name: 'Kandy High Court',
    type: 'High Court',
    address: 'Palace Square, Kandy',
    contact: '+94 81 2234567',
    description: 'Handles major criminal and civil cases in Kandy district',
    district: 'Kandy'
  },
  {
    id: 5,
    name: 'Galle District Court',
    type: 'District Court',
    address: 'Court Complex, Galle',
    contact: '+94 91 2234567',
    description: 'Civil jurisdiction and commercial matters',
    district: 'Galle'
  }
];

const ngos = [
  {
    id: 1,
    name: 'Legal Aid Commission of Sri Lanka',
    description: 'Provides free legal assistance to underprivileged citizens',
    address: 'Hulftsdorp Street, Colombo 12',
    contact: '+94 11 2433668',
    email: 'info@legalaid.lk',
    website: 'www.legalaid.lk',
    focusAreas: ['Legal Aid', 'Human Rights', 'Access to Justice'],
    services: [
      'Free legal consultation',
      'Court representation',
      'Legal awareness programs'
    ]
  },
  {
    id: 2,
    name: 'Transparency International Sri Lanka',
    description: 'Works towards eliminating corruption and promoting transparency',
    address: 'Colombo 05',
    contact: '+94 11 2433669',
    email: 'info@tisrilanka.org',
    website: 'www.tisrilanka.org',
    focusAreas: ['Anti-corruption', 'Good Governance', 'Legal Reform'],
    services: [
      'Corruption reporting',
      'Policy advocacy',
      'Public interest litigation'
    ]
  },
  {
    id: 3,
    name: 'Centre for Policy Alternatives',
    description: 'Strengthening civil society and democratic institutions',
    address: 'Colombo 03',
    contact: '+94 11 2565304',
    email: 'info@cpalanka.org',
    website: 'www.cpalanka.org',
    focusAreas: ['Democracy', 'Human Rights', 'Constitutional Reform'],
    services: [
      'Research and advocacy',
      'Legal support',
      'Public interest litigation'
    ]
  },
  {
    id: 4,
    name: 'INFORM Human Rights Documentation Centre',
    description: 'Monitoring and documenting human rights violations',
    address: 'Colombo 08',
    contact: '+94 11 2689033',
    email: 'inform@inform.lk',
    website: 'www.inform.lk',
    focusAreas: ['Human Rights', 'Documentation', 'Advocacy'],
    services: [
      'Human rights monitoring',
      'Documentation',
      'Advocacy campaigns'
    ]
  }
];

app.get('/api/courts', (req, res) => {
  res.json(courts);
});

app.get('/api/ngos', (req, res) => {
  res.json(ngos);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});