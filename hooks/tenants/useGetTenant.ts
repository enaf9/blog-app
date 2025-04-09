import { getTenant } from "@/api/tenants"
import { useQuery } from "@tanstack/react-query"

export const useTenant = (id: string) => {
  const query = useQuery({
    queryKey: ["tenant", id],
    queryFn: () => getTenant(id),
    enabled: !!id
  })

  return {
    ...query,
    tenant: query.data
  }
}
