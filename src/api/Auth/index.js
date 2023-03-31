import apiClient from "../apiClient";

// MEMO: body => {email , password}
export const login = (body) => {
  return apiClient.post("/auth/login", body);
};

// MEMO: body => { email, password}
export const register = (body) => {
  return apiClient.post("/auth/register", body);
};

// MEMO: body => {email , password}
export const adminlogin = (body) => {
  return apiClient.post("/auth/login/admin", body);
};

// MEMO: body => { email, password}
export const adminRegister = (body) => {
  return apiClient.post("/auth/register/admin", body);
};
