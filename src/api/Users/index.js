import apiClient from "../apiClient";

// 나의 정보 불러오기
export const getUsersMe = () => {
  return apiClient.get(`/users/me`);
};
