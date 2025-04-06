import { LoginValues } from "@/types/Authentication"

import client from "./client"

export const login = async (body: LoginValues) => {
  const response = await client.post("/login", body)

  return response.data
}
