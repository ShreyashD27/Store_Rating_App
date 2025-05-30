import { jwtDecode } from 'jwt-decode';


export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  return jwtDecode(token);
}

export function logout() {
  localStorage.removeItem('token');
}
