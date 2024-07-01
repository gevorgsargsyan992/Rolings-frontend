import { ReactNode } from "react";

export interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onConfirm?: (props: any) => void;
  onClose?: () => void;
  children?: ReactNode;
  showButtons?: boolean;
}
