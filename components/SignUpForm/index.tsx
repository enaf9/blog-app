"use client"

import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useCreateTenant } from "@/hooks/tenants/useCreateTenant"

import { Button } from "../Button"
import { InputField } from "../InputField"
import { Loading } from "../Loading"

const newTenantSchema = z.object({
  name: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
})

type NewTenantValues = z.infer<typeof newTenantSchema>

export const SignUpForm = () => {
  const router = useRouter()
  const { createTenant, isPending } = useCreateTenant()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewTenantValues>({ resolver: zodResolver(newTenantSchema) })

  const onSubmit = (data: NewTenantValues) => {
    createTenant(data, {
      onSuccess: () => {
        router.push("/login")
        toast.success("You were successfully registered! Now you can login!")
      }
    })
  }

  if (isPending) {
    return (
      <div className="mt-40">
        <Loading />
      </div>
    )
  }

  return (
    <div className="max-w-96 p-10 rounded-lg shadow-lg mt-24 mx-auto">
      <h3 className="text-2xl font-semibold mb-3">Sign up</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <InputField
          id="name"
          label="Username"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="grid">
          <Button disabled={isPending}> Sign up</Button>
        </div>
      </form>
    </div>
  )
}
