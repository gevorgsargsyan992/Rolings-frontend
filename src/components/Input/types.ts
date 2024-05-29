import React from "react";

export interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: any) => void;
  className?: string;
  required?: boolean;
  errorText?: string;
}