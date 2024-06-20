import React, { FC, useState, ChangeEvent } from "react";
import { TableProps } from "./types"; // Ensure these types are correctly defined in your types file
import Button from "../Button";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";

const { Text } = Typography;



// interface Column<T> {
//   key: keyof T;
//   label: string;
//   editable?: boolean;
//   render?: (value: T[keyof T]) => React.ReactNode;
// }
//
// interface TableAction<T> {
//   label: string;
//   onClick: (row: T) => void;
// }

const Table: FC<TableProps<any>> = ({
  data,
  columns,
  className = "",
  isRowEdit = false,
  isRowClickable = true,
  url = "",
  rowActions = [], // Default to an empty array
}) => {
  const router = useRouter();
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedRowData, setEditedRowData] = useState<Record<string, any>>({});

  // Local state for table data to update UI after saving
  const [tableData, setTableData] = useState(data);

  const handleRowClick = (row: any) => {
    if (editRowId !== null) return; // Prevent navigation while editing
    router.push(`/${url}/${row.id}`);
  };

  // const handleEditRow = (row: any) => {
  //   setEditRowId(row.id);
  //   setEditedRowData(row); // Initialize edit data with current row data
  // };

  // const handleCancelEdit = () => {
  //   setEditRowId(null);
  //   setEditedRowData({});
  // };

  // const handleSaveEdit = (id: number) => {
  //   const updatedData = tableData.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, ...editedRowData };
  //     }
  //     return item;
  //   });
  //
  //   // Set the updated data to the local state
  //   setTableData(updatedData);
  //   setEditRowId(null);
  //   setEditedRowData({});
  // };

  // const handleInputChange = (key: string, value: any) => {
  //   setEditedRowData((prevData) => ({
  //     ...prevData,
  //     [key]: value,
  //   }));
  // };

  return (
    <div className={`flex flex-col w-full py-4 ${className}`}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className="border-b-2 text-left px-4 py-2"
                key={column.key as string}
              >
                <Text level={5}>{column.label}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              onClick={() => isRowClickable && handleRowClick(row)}
              className={`cursor-pointer ${
                editRowId === row.id ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              {columns.map((column) => (
                <td className="border-b px-4 py-2" key={column.key as string}>
                  {/*{editRowId === row.id && column.editable ? (*/}
                  {/*  <input*/}
                  {/*    type="text"*/}
                  {/*    value={*/}
                  {/*      editedRowData[column.key as string] ?? row[column.key]*/}
                  {/*    }*/}
                  {/*    onChange={(e: ChangeEvent<HTMLInputElement>) =>*/}
                  {/*      handleInputChange(column.key as string, e.target.value)*/}
                  {/*    }*/}
                  {/*    className="w-full"*/}
                  {/*  />*/}
                  {/*) : (*/}
                    <Text level={6}>
                      {column.render
                        ? column.render(row[column.key])
                        : row[column.key]}
                    </Text>
                   {/*)}*/}
                </td>
              ))}
              {/*{isRowEdit && (*/}
              {/*  <td className="border-b px-4 py-2">*/}
              {/*    {editRowId === row.id ? (*/}
              {/*      <div className="flex gap-1">*/}
              {/*        <Button*/}
              {/*          type="text"*/}
              {/*          onClick={() => handleSaveEdit(row.id)}*/}
              {/*        >*/}
              {/*          Save*/}
              {/*        </Button>*/}
              {/*        <Button type="text" onClick={handleCancelEdit}>*/}
              {/*          Cancel*/}
              {/*        </Button>*/}
              {/*      </div>*/}
              {/*    ) : (*/}
              {/*      <Button type="text" onClick={() => handleEditRow(row)}>*/}
              {/*        Edit*/}
              {/*      </Button>*/}
              {/*    )}*/}
              {/*  </td>*/}
              {/*)}*/}
              {rowActions.length > 0 && (
                <td className="border-b px-4 py-2">
                  <div className="flex gap-1">
                    {rowActions.map((action, idx) => (
                      <Button
                        key={idx}
                        type="text"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click if action is triggered
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
