import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { IError } from '../../../interfaces';
import Buttons from '../Buttons/Buttons';
import Error from '../Error';
import Alert from './Alert';

interface IProps {
  error: IError;
  name: string;
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  onClick: () => Promise<void>;
}

function DeleteAlert({ error, name, ...btnProps }: IProps) {
  const { t } = useTranslation();
  return (
    <Alert title={null}>
      {error.status && <Error message={error.message} />}
      <span>{t('titles.QUESTION_DELETE', { name })}</span>
      <Buttons {...btnProps} action={t('actions.DELETE')} isSubmit={false} />
    </Alert>
  );
}

export default DeleteAlert;
