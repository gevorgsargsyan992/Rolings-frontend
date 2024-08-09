import React, { FC, useState } from "react";
import { TableProps } from "./types";
import Button from "../Button";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const Table: FC<TableProps<any>> = ({
  data,
  columns,
  className = "",
  isRowClickable = true,
  url = "",
  rowActions = [],
}) => {
  const router = useRouter();
  const [editRowId, setEditRowId] = useState<number | null>(null);

  const handleRowClick = (row: any) => {
    if (editRowId !== null) return;
    router.push(`/${url}/${row.id}`);
  };

  return (
    <div className={`flex flex-col w-full pt-4 ${className}`}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className="border-b-2 text-left px-4 py-2"
                key={column.key as string}
              >
                <Text className="text-sm md:text-base lg:text-lg">
                  {column.label}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => isRowClickable && handleRowClick(row)}
              className={`cursor-pointer ${
                editRowId === row.id ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              {columns.map(
                (column) => (
                    <td
                      className="border-b px-4 py-2"
                      key={column.key as string}
                    >
                      {column?.link ? (
                        <a
                          href={row?.url}
                          className="text-center text-xs md:text-base text-blue-500 underline"
                          target="blank"
                        >
                          Link
                        </a>
                      ) : (
                        <Text className="text-xs md:text-sx lg:text-base">
                          {column.render
                            ? column.render(row[column.key])
                            : row[column.key]}
                        </Text>
                      )}
                    </td>
                  )
              )}
              {rowActions.length > 0 && (
                <td className="border-b border-t border-h-4 px-4 py-2">
                  <div className="flex gap-1">
                    {rowActions.map((action, idx) => (
                      <Button
                        key={idx}
                        type="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
