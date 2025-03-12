import express from 'express';
import cors from 'cors';
import { ngos } from './data/ngos.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all NGOs
app.get('/api/ngos', (req, res) => {
  res.json(ngos);
});

// Get NGO by ID
app.get('/api/ngos/:id', (req, res) => {
  const ngo = ngos.find(n => n.Name === req.params.id);
  if (ngo) {
    res.json(ngo);
  } else {
    res.status(404).json({ message: 'NGO not found' });
  }
});

// Get all categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(ngos.map(ngo => ngo.Category))];
  res.json(categories);
});

// Get all districts
app.get('/api/districts', (req, res) => {
  const districts = [...new Set(ngos.map(ngo => ngo.District))];
  res.json(districts);
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});