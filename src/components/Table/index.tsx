"use client";
import { FC, useState } from "react";
import { TableProps } from "./types";
import Button from "../Button";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const Table: FC<TableProps> = ({
  data,
  columns,
  className,
  isRowEdit,
}) => {
  const router = useRouter();
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({});

  const handleRowClick = (row: any) => {
    if (editRowId !== null) return; // Prevent navigation while editing
    router.push(`/tablet/${row.id}`);
  };

  const handleEditRow = (row: any) => {
    setEditRowId(row.id);
    setEditedData(row);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedData({});
  };

  const handleSaveEdit = (id: number) => {
    setEditRowId(null);
  };

  const handleChange = (key: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={`w-full py-4 ${className}`}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th className="border-b-2 text-left px-4 py-2" key={column.key}>
                <Text level={5}>{column.label}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(row)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {columns.map((column) => (
                <td className="border-b px-4 py-2" key={column.key}>
                  {editRowId === row.id ? (
                    <input
                      type="text"
                      value={editedData[column.key]}
                      onChange={(e) => handleChange(column.key, e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <Text level={6}>
                      {column.render
                        ? column.render(row[column.key])
                        : row[column.key]}
                    </Text>
                  )}
                </td>
              ))}
              {isRowEdit && (
                <td className="border-b px-4 py-2">
                  {editRowId === row.id ? (
                    <>
                      <Button
                        type="text"
                        onClick={() => handleSaveEdit(row.id)}
                      >
                        Save
                      </Button>
                      <Button type="text" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button type="text" onClick={() => handleEditRow(row)}>
                      Edit
                    </Button>
                  )}
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
