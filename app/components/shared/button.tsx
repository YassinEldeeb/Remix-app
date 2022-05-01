import type { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import { Spinner } from './spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: ButtonSize;
  appearance?: ButtonAppearance;
}

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonAppearance = 'primary' | 'secondary' | 'danger' | 'muted';

export const Button = ({
  children,
  isLoading,
  size = 'medium',
  appearance = 'primary',
  className,
  ...props
}: ButtonProps) => {
  const computeStyles = (appearance: ButtonAppearance) => {
    switch (appearance) {
      case 'primary':
        return 'text-white bg-indigo-600 hover:bg-indigo-700';
      case 'secondary':
        return 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200';
      case 'danger':
        return 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'muted':
        return 'text-indigo-700 bg-white border-gray-200 hover:bg-gray-50';
    }
  };

  return (
    <button
      {...props}
      className={classnames(
        computeStyles(appearance),
        size === 'small' && 'px-3 py-2 text-sm',
        size === 'medium' && 'px-4 py-2 text-sm ',
        size === 'large' && 'px-4 py-2 text-base',
        className,
        'inline-flex items-center border border-transparent shadow-sm leading-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      )}
    >
      {children}
      {isLoading && <Spinner />}
    </button>
  );
};
