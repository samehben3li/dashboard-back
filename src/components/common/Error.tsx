import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  message: string;
}

function Error({ message }: IProps) {
  const { t } = useTranslation();
  return <span className="error">{t(`errors.${message}`)}</span>;
}

export default Error;
