import api from "../lib/axios"

export const registerAPI = (data) => {
  return api.post("/auth/register", data)
}

export const loginAPI = (data) => {
  return api.post("/auth/login", data)
}

export const logoutAPI = () =>{
  return api.post("/auth/logout")
}
