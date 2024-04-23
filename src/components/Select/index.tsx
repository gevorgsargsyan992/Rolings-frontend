'use client'
import React, { useState } from 'react';
import {SelectDropdownProps,Option} from './types'


const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, defaultValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(defaultValue || options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Call onSelect callback with the selected option
  };

  return (
      <div className="relative inline-block">
        <button
            onClick={toggleDropdown}
            className="py-2 flex items-center text-gray-800"
        >
          {selectedOption.label}
          <svg
              className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path
                fillRule="evenodd"
                d="M6.293 7.707a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
            <div className="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
              {options.map((option) => (
                  <button
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                      className="block w-full px-2 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {option.label}
                  </button>
              ))}
            </div>
        )}
      </div>
  );
};

export default SelectDropdown;
