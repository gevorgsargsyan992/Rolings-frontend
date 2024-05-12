import React from "react";

export interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onConfirm: () => void;
  children?: React.ReactNode
}
