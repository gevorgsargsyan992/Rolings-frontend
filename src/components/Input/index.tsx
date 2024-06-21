import React, { useState } from "react";
import Image from 'next/image';
import { InputFieldProps } from "@/components/Input/types";
import visibleImg from '../../../public/visible.svg'
import inVisibleImg from '../../../public/invisible.svg'

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
              <Image width={20} alt='visible' src={visibleImg} color='orange'/>
            ) : (
                <Image width={20} alt='invisible' src={inVisibleImg} />
            )}
          </button>
        )}
      </div>
      {/*{errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}*/}
    </div>
  );
};

export default InputField;
