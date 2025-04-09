import { Tenant, TenantPayload } from "@/types/Tenant"

import client from "./client"

export const getTenant = async (id: string) => {
  const response = await client.get(`/tenants/${id}`)

  return response.data as Tenant
}

export const postTenant = async (body: TenantPayload) => {
  const response = await client.post("/tenants", body)

  return response.data as Tenant
}
