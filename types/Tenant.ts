export type Tenant = {
  tenantId: string
  apiKey: string
  name: string
  password: string
  createdAt: string
  lastUsedAt: string
}
export type TenantPayload = {
  name: string
  password: string
}
