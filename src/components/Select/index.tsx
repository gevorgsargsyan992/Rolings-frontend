"use client";
import { FC, useState } from "react";
import { SelectDropdownProps, Option } from "./types";
import Typography from "../Typography";
import Icon from "@/components/Icon";

const { Text } = Typography;

const SelectDropdown: FC<SelectDropdownProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(
    defaultValue || options[0]
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect && onSelect(option);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="py-2 flex items-center text-gray-800"
      >
        <Text className="font-semibold" color="text-black">
          {selectedOption.label}
        </Text>
        <Icon name={isOpen ? "arrow-up-small" : "arrow-down-small"} />
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="block w-full px-2 py-2 text-gray-800 hover:bg-gray-100"
            >
              <Text color="text-black">{option.label}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
