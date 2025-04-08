import { useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { twMerge } from "tailwind-merge"

type TableProps<T> = {
  columns: Array<ColumnDef<T>>
  tableData: Array<T>
}

export const Table = <T,>({ columns, tableData }: TableProps<T>) => {
  const [data] = useState(() => [...tableData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full bg-white">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-slate-100">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="py-3 px-6 text-left text-sm uppercase font-medium text-gray-500 border-b border-slate-200"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-slate-50">
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={twMerge(
                    "py-4 px-6 border-b border-slate-200",
                    index === row.getVisibleCells().length - 1 &&
                      "text-right w-32"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!data.length && (
        <div className="my-8 text-center text-sm">
          <span>There was no data found</span>
        </div>
      )}
    </div>
  )
}
