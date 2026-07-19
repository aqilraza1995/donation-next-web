import api from "../lib/axios"

export const getDashboardApi = () => {
  return api.get("/dashboard/count")
}

export const getDonationChartDataApi = (days) => {
  return api.get("/dashboard/donation-by-date-range", days)
}