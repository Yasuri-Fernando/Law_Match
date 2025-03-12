const API_URL = 'http://localhost:3000/api';

export async function fetchNGOs() {
  const response = await fetch(`${API_URL}/ngos`);
  if (!response.ok) {
    throw new Error('Failed to fetch NGOs');
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function fetchDistricts() {
  const response = await fetch(`${API_URL}/districts`);
  if (!response.ok) {
    throw new Error('Failed to fetch districts');
  }
  return response.json();
}