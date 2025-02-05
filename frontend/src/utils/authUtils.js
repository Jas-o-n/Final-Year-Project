import jwtDecode from 'jwt-decode';

export const getUserID = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  return decoded.id;
};