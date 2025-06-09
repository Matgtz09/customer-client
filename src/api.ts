export const API_BASE_URL = "http://localhost:3000"; // or staging/prod later

export async function fetchProperties() {
  const res = await fetch(`${API_BASE_URL}/properties`);
  return res.json();
}