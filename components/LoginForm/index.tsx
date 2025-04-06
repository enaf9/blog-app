"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useLogin } from "@/hooks/useLogin"

import { Button } from "../Button"
import { InputField } from "../InputField"

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type LoginValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { login } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: LoginValues) => {
    login(data)
  }

  return (
    <div className="max-w-96 p-10 rounded-lg shadow-lg mt-24 mx-auto">
      <h3 className="text-2xl font-semibold mb-3">Log in</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <InputField
          id="username"
          label="Username"
          {...register("username")}
          error={errors.username?.message}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="flex justify-end">
          <Button>Log in</Button>
        </div>
      </form>
    </div>
  )
}
