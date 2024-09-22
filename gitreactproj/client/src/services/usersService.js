import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
const apiEndpoint = "/users";

refreshTokenHeader();

export function refreshTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function login(credentials) {
  const response = await httpService.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  refreshTokenHeader();

  return response;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  refreshTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function updateUser(userId, user) {
  return httpService.put(`${apiEndpoint}/${userId}`, user);
}

export async function fetchUserData() {
  try {
    const token = getJWT();
    const response = await httpService.get(`${apiEndpoint}/me`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}


export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  return httpService.get("/users/me");
}


const usersService = {
  createUser,
  login,
  logout,
  getUser,
  getJWT,
  updateUser,
};

export default usersService;
