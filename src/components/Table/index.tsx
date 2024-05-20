"use client";
import { FC, useState } from "react";
import { TableProps } from "./types";
import Button from "../Button";

const Table: FC<TableProps> = ({ data, columns }) => {
  const [isEditAccess, setIsEditAccess] = useState(true);

  const handleEditRow = (id: number) => {
    // TODO: handle edit row
  };

  return (
    <div className="w-full py-4">
      <table className="table-auto">
        <thead>
          <tr>
            {columns.map((column) => (
              <th className="border-b-2 px-4 py-2" key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td className="border-b px-4 py-2" key={column.key}>
                  {column.render
                    ? column.render(row[column.key])
                    : row[column.key]}
                </td>
              ))}
              {isEditAccess && (
                <td className="border-b order-t px-4 py-2">
                  <Button type="text" onClick={() => handleEditRow(row.id)}>
                    Edit
                  </Button>
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
