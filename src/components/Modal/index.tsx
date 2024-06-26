import { FC, useState, useCallback, useEffect } from "react";
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
  showButtons = true,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpenModal(isOpen);
    }
  }, [isOpen]);

  const handleConfirm = useCallback(
    (prop: any) => {
      onConfirm && onConfirm(prop);
      setIsOpenModal(false);
    },
    [onConfirm]
  );
  const handleClose = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    isOpenModal && (
      <div className="fixed inset-0 z-9000 flex items-center justify-center overflow-x-hidden overflow-y-hidden outline-none focus:outline-none bg-gray-400 bg-opacity-60">
        <div className="relative flex flex-col bg-white border-1 border-gray-300 shadow-md rounded-lg outline-none px-12 py-4">
          {!!children ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center p-5">
              {title && (
                <Title bold level={4}>
                  {title}
                </Title>
              )}
              {subtitle && (
                <Text className="pt-4 text-lg">
                  {subtitle}
                </Text>
              )}
            </div>
          )}
          {showButtons && (
            <div className="flex items-center gap-4 justify-between px-5 py-4 border-t border-gray-300 rounded-bl-lg rounded-br-lg">
              <Button className="flex-1" type="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="flex-1 min-w-20" onClick={handleConfirm}>
                Ok
              </Button>
            </div>
          )}
        </div>
        <div className="fixed z-40 opacity-20"></div>
      </div>
    )
  );
};

export default Modal;
