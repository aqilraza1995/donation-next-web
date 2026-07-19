import api from "../lib/axios"


export const createDonationAPI = (data) => {
  return api.post("/donation/create-checkout-session", data)
}

export const getuserDonationsAPI = () => {
  return api?.get("/donation/my-donations")
}