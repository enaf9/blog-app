import { DragEvent, FormEvent, InputHTMLAttributes, useState } from "react"
import Image from "next/image"

import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline"
import { twMerge } from "tailwind-merge"

type ImageInputProps = {
  label?: string
  onFileChange: (file: File) => void
  onFileDelete: () => void
  accept?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

// Max size of file is 5MB
const MAX_SIZE = 5 * 1024 * 1024

export const FileInput: React.FC<ImageInputProps> = ({
  label,
  onFileChange,
  onFileDelete,
  error,
  accept,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0]

    if (!file) return

    validateImage(file)
  }

  const handleDragOver = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFile = e.dataTransfer?.files?.[0]
    if (!droppedFile) return

    validateImage(droppedFile)
  }

  const validateImage = (selectedFile: File) => {
    if (selectedFile.size > MAX_SIZE) {
      setFormError(
        `File size exceeds the maximum limit of ${MAX_SIZE / 1024 / 1024}MB`,
      )
      setPreview(null)
      return
    }

    if (accept && !accept.split(",").includes(selectedFile.type)) {
      setFormError(`Invalid file type. Only ${accept} files are allowed.`)
      setPreview(null)
      return
    }

    setPreview(URL.createObjectURL(selectedFile))
    onFileChange(selectedFile)

    setFormError(null)
  }

  const handleReplaceClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPreview(null)
    onFileDelete()
  }

  return (
    <div>
      <label
        htmlFor={"file-input"}
        className="block text-sm font-medium text-emerald-700 mb-2"
      >
        {label || "Upload File"}
      </label>

      <input
        id={"file-input"}
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
      />
      <div
        className={twMerge(
          "h-72 border border-dashed border-emerald-700 rounded-lg flex flex-col gap-2 items-center justify-center max-w-xl w-full p-2",
          dragActive && "border-2",
          preview && "border-solid border-slate-300",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {dragActive ? (
          <div className="font-semibold text-xl">Drop the file</div>
        ) : preview ? (
          <div className="relative h-full w-full">
            <Image
              src={preview}
              alt="Article image"
              layout="fill"
              objectFit="contain"
            />

            <div className="absolute bottom-0 right-0 flex gap-2 text-white">
              <label
                htmlFor="file-input"
                className=" bg-emerald-600 p-2 rounded-lg hover:bg-emerald-700 cursor-pointer"
              >
                <ArrowUpTrayIcon className="size-8" />
              </label>
              <button
                className="bg-red-500 p-2 rounded-lg hover:bg-red-600 cursor-pointer"
                onClick={handleReplaceClick}
              >
                <TrashIcon className="size-8" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="font-semibold text-xl">Drag & drop file here</span>
            <span>or</span>

            <label
              htmlFor="file-input"
              className="bg-emerald-700 rounded-lg py-2 px-5 text-white  font-semibold hover:bg-emerald-600"
            >
              Select file
            </label>
          </>
        )}
      </div>
      <div className="mt-1 text-rose-700 text-sm">{formError || error}</div>
    </div>
  )
}
