import { FC, useCallback } from "react";
import Button from "../Button";
import Typography from "../Typography";
import { ModalProps } from "./types";

const { Title, Text } = Typography;

const Modal: FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  onConfirm,
  children,
  onClose,
  showButtons = true,
}) => {

  const handleConfirm = useCallback(
    (prop: any) => {
      if (onConfirm) {
        onConfirm(prop);
      }
      onClose && onClose();
    },
    [onClose, onConfirm]
  );

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-60">
        <div className="relative flex flex-col bg-white border border-gray-300 shadow-md rounded-lg px-8 py-6 max-w-[1000px]">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {(title || subtitle) && (
            <div className="flex flex-col items-center justify-center p-5">
              {title && (
                <Title bold level={4} className="mb-2 text-center">
                  {title}
                </Title>
              )}
              {subtitle && (
                <Text className="text-lg text-center">{subtitle}</Text>
              )}
            </div>
          )}
          {children}
          {showButtons && (
            <>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex items-center gap-4 justify-between px-5 py-4 border-t border-gray-300">
                <Button className="flex-1" type="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="flex-1 min-w-20" onClick={handleConfirm}>
                  Ok
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
