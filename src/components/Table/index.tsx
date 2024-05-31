"use client";
import { FC, useState } from "react";
import { TableProps } from "./types";
// import Button from "../Button";
import Typography from "@/components/Typography";

const { Text } = Typography;

const Table: FC<TableProps> = ({ data, columns, className }) => {
  //const [isEditAccess, setIsEditAccess] = useState(true); //TODO: handle is edit access case

  const handleEditRow = (id: number) => {
    // TODO: handle edit row
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
            <tr key={index}>
              {columns.map((column) => (
                <td className="border-b px-4 py-2" key={column.key}>
                  <Text level={6}>
                    {column.render
                      ? column.render(row[column.key])
                      : row[column.key]}
                  </Text>
                </td>
              ))}
              {/*{isEditAccess && (*/}
              {/*  <td className="border-b order-t px-4 py-2">*/}
              {/*    <Button type="text" onClick={() => handleEditRow(row.id)}>*/}
              {/*      Edit*/}
              {/*    </Button>*/}
              {/*  </td>*/}
              {/*)}*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
