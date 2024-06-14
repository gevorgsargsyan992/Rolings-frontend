import React, { FC, useState } from "react";
import { TableProps } from "./types";
import Button from "../Button";
import Typography from "@/components/Typography";
import { useRouter } from "next/navigation";
import { TabletStatus } from "@/app/[locale]/tablet/constants";

const { Text } = Typography;

const Table: FC<TableProps> = ({ data, columns, className, isRowEdit }) => {
  const router = useRouter();
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>("");

  // Local state for table data to update UI after saving
  const [tableData, setTableData] = useState(data);

  const handleRowClick = (row: any) => {
    if (editRowId !== null) return; // Prevent navigation while editing
    router.push(`/tablet/${row.id}`);
  };

  const handleEditRow = (row: any) => {
    setEditRowId(row.id);
    setEditedStatus(row.tabletStatus); // Set the current status for the row
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedStatus("");
  };

  const handleSaveEdit = (id: number) => {
    // Update the data source with the new status
    const updatedData = tableData.map((item) => {
      if (item.id === id) {
        return { ...item, tabletStatus: editedStatus };
      }
      return item;
    });

    // Set the updated data to the local state
    setTableData(updatedData);
    setEditRowId(null);
    setEditedStatus("");
  };

  const handleStatusChange = (value: string) => {
    setEditedStatus(value);
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
          {tableData.map((row, index) => (
              <tr
                  key={index}
                  onClick={() => handleRowClick(row)}
                  className={`cursor-pointer ${
                      editRowId === row.id ? "bg-gray-100" : "hover:bg-gray-100"
                  }`}
              >
                {columns.map((column) => (
                    <td className="border-b px-4 py-2" key={column.key}>
                      {editRowId === row.id && column.key === "tabletStatus" ? (
                          <select
                              value={editedStatus}
                              onChange={(e) => handleStatusChange(e.target.value)}
                              className="w-full"
                          >
                            {Object.entries(TabletStatus).map(([key, value]) => (
                                <option key={key} value={value}>
                                  {value}
                                </option>
                            ))}
                          </select>
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
                          <div className="flex gap-1">
                            <Button
                                type="text"
                                onClick={() => handleSaveEdit(row.id)}
                            >
                              Save
                            </Button>
                            <Button type="text" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                          </div>
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
