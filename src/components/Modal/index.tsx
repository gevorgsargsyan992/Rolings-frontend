import { FC, useState, useCallback } from "react";
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
}) => {
  const [isOpenModal, setIsOpenModal] = useState(isOpen);

  const handleConfirm = useCallback(() => {
    onConfirm();
    setIsOpenModal(false);
  }, [onConfirm]);

  const handleClose = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    isOpenModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative flex flex-col bg-white border-1 border-gray-300 shadow-md rounded-lg outline-none">
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
                <Text level={5} className="pt-4">
                  {subtitle}
                </Text>
              )}
            </div>
          )}
          <div className="flex items-center gap-4 justify-between px-5 py-4 border-t border-gray-300 bg-gray-100 rounded-bl-lg rounded-br-lg">
            <Button className="flex-1" type="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="flex-1 min-w-20" onClick={handleConfirm}>
              Ok
            </Button>
          </div>
        </div>
        <div className="fixed z-40 opacity-20"></div>
      </div>
    )
  );
};

export default Modal;
