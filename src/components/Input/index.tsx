import React, { useState } from "react";
import { InputFieldProps } from "@/components/Input/types";

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  errorText,
  className = "",
  showEyeIcon = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
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
        {type === "password" && showEyeIcon && (
          <button
            type="button"
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M5.93 4.072a12.02 12.02 0 015.905-2.662A12.08 12.08 0 0115.927 4l1.41-1.415a.625.625 0 01.884 0l.884.884a.625.625 0 010 .884l-1.411 1.415a12.122 12.122 0 01-.228 11.568l1.041 1.04a.625.625 0 010 .883l-.883.884a.625.625 0 01-.884 0l-1.04-1.042a12.122 12.122 0 01-11.568.228L4.072 14.07a.625.625 0 010-.884l.883-.883a.625.625 0 01.884 0L6.55 13.4a12.019 12.019 0 01-.242-9.328l-.883-.884a.625.625 0 010-.884l.883-.883a.625.625 0 01.884 0l.884.883z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4.072 5.931a12.021 12.021 0 012.662-5.905A12.08 12.08 0 0116 4.073l-1.415 1.41a.625.625 0 010 .884l-1.415 1.41a12.122 12.122 0 01-.228 11.568l1.041 1.041a.625.625 0 010 .884l-.884.883a.625.625 0 01-.884 0l-1.042-1.04a12.122 12.122 0 01-11.568.228L3.07 15.927a.625.625 0 01-.884 0l-.883-.883a.625.625 0 010-.884l1.41-1.411a12.019 12.019 0 01-5.906-2.662l-.884.883a.625.625 0 01-.884 0l-.883-.883a.625.625 0 010-.884l.883-.884a12.02 12.02 0 012.662-5.905l-1.41-1.415a.625.625 0 010-.884L2.93 3.07a.625.625 0 01.884 0l1.415 1.41z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
    </div>
  );
};

export default InputField;
