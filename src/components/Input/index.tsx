import React from "react";
import { InputFieldProps } from "@/components/Input/types";

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  errorText,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border p-2 rounded-md text-gray-700 w-full ${
          errorText
            ? "border-red-500"
            : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
        }`}
        {...props}
      />
      {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
    </div>
  );
};

export default InputField;
