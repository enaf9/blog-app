import client from "./client"

export const postImage = async (data: FormData) => {
  const response = await client.post("/images", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}
