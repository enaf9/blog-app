import axios from "axios"

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
  },
})

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized user - redirect to login
    } else if (error.response?.status === 500) {
      // Handle internal server error
    }
    return Promise.reject(error)
  }
)

export default client
