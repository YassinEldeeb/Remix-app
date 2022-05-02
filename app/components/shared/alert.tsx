import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export type AlertAppearance = 'info' | 'warning' | 'danger';

interface AlertProps {
  message: string;
  type: AlertAppearance;
}

// TODO: add different styles for alerts
export const Alert = ({ message, type = 'warning' }: AlertProps) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-yellow-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">{message}</p>
        </div>
      </div>
    </div>
  );
};
