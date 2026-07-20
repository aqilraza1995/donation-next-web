import api from "../lib/axios"

export const getUserAPI = () => {
	return api.get("/user")
}