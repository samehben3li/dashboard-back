import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  className: string;
  action: string;
  onClick: () => void;
}

function Button({ action, ...props }: IProps) {
  const { t } = useTranslation();
  return (
    <button type="button" {...props}>
      {`${t(action)}`}
    </button>
  );
}

export default Button;
