import { FC } from "react";
import { SkeletonTableProps } from "./types";

const SkeletonTable: FC<SkeletonTableProps> = ({
  rows = 3,
  columns = 3,
  className = "",
  showHeader = false,
}) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {showHeader && <div className="h-6 bg-gray-300 rounded w-1/4" />}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-8 bg-gray-300 rounded w-full"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;
