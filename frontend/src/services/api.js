import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function createUser(payload) {
  const res = await axios.post(`${API_BASE}/api/users`, payload);
  return res.data;
}
