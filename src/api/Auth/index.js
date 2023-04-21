import apiClient from '../apiClient';

/**body => {email, password} */
export const login = (body) => {
  return apiClient.post('/auth/login', body);
};

/**body => {email, password} */
export const register = (body) => {
  return apiClient.post('/auth/register', body);
};

/**body => {email, password} */
export const adminlogin = (body) => {
  return apiClient.post('/auth/login/admin', body);
};

/**body => {email, password} */
export const adminRegister = (body) => {
  return apiClient.post('/auth/register/admin', body);
};
