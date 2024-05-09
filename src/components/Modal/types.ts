export interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onConfirm: () => void;
}
