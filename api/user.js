import api from "../lib/axios"

export const getUserAPI = (params) => {
	return api.get("/user",{params})
}

export const getUserByIdAPI = (id)=>{
	return api?.get(`/user/${id}`)
}