import { useEffect, useState } from "react"

import Cookies from "js-cookie"

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  return { isAuthenticated }
}
