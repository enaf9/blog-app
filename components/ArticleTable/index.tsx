"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ColumnDef } from "@tanstack/react-table"
import { twMerge } from "tailwind-merge"

import { Article } from "@/types/Article"

import { useDeleteArticle } from "@/hooks/articles/useDeleteArticle"
import { useArticles } from "@/hooks/articles/useGetArticles"

import { Button } from "../Button"
import { Loading } from "../Loading"
import { Table } from "../Table"

export const columns: Array<ColumnDef<Article & { actions: ReactNode }>> = [
  {
    accessorKey: "title",
    header: "Article Title",
    cell: value => (
      <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-80">
        {value.renderValue() as string}
      </div>
    )
  },
  {
    accessorKey: "perex",
    header: "Perex",
    cell: value => (
      <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-96">
        {value.renderValue() as string}
      </div>
    )
  },
  {
    accessorKey: "author",
    header: "Author"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: info => info.renderValue()
  }
]

export const ArticleTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState("")
  const { articles, isFetching } = useArticles()

  const { deleteArticle } = useDeleteArticle()

  const handleDeleteArticle = (id: string) => {
    setIsDeleteModalOpen(true)
    setArticleToDelete(id)
  }

  return (
    <div className="mt-12">
      {isFetching ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          tableData={(articles ?? [])?.map(item => ({
            ...item,
            actions: (
              <div className="flex gap-4">
                <Link href={`/edit-article/${item.articleId}`}>
                  <PencilIcon className="size-6" />
                </Link>
                <button onClick={() => handleDeleteArticle(item.articleId)}>
                  <TrashIcon className="size-6 text-red-600 cursor-pointer" />
                </button>
              </div>
            )
          }))}
        />
      )}

      {isDeleteModalOpen && (
        <div
          className={twMerge(
            "fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black/45 p-7"
          )}
        >
          <div className="flex w-full max-w-96 flex-col items-center gap-5 rounded-lg bg-white p-5">
            <h3 className="mb-8 text-lg font-semibold">
              Do you really want to delete this article?
            </h3>

            <div className="flex justify-end gap-3">
              <Button
                type="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="danger"
                onClick={() => {
                  deleteArticle(articleToDelete)
                  setArticleToDelete("")
                  setIsDeleteModalOpen(false)
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
