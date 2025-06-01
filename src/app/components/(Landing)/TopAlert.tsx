// TopAlert.tsx
import { FC } from 'react';

interface TopAlertProps {
  message: string;
}

const TopAlert: FC<TopAlertProps> = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white text-center py-2 z-50">
      {message}
    </div>
  );
};

export default TopAlert;
