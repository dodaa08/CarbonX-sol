import { FC } from "react";

interface PopUpAlertProps {
  message: string;
  onClose: () => void;
}

const PopUpAlert: FC<PopUpAlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-black text-white rounded-xl shadow-lg z-50">
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="ml-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default PopUpAlert;
