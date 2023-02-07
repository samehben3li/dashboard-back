import React, {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { ICredentials, IError, IUser } from '../../interfaces';
import { ADD_USER } from '../../requests/mutations';
import Alert from '../Alert';
import ErrorContainer from '../Error';
import Buttons from '../Buttons';
import useHandleChange from '../../hooks/useHandleChange';

interface IProps {
  setAlertAddUser: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

interface IPropsInfos {
  userInfo: ICredentials;
  setUserInfo: Dispatch<SetStateAction<ICredentials>>;
}

interface IPropsField {
  setUserInfo: Dispatch<SetStateAction<ICredentials>>;
  valueOfInput: string | undefined;
  title: string;
  type: string;
  name: string;
}

interface IPropsForm {
  setError: Dispatch<SetStateAction<IError>>;
  userInfo: ICredentials;
  children: ReactNode;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  setAlertAddUser: Dispatch<SetStateAction<boolean>>;
}

const useCreateUser = () => {
  const [createUser, { loading }] = useMutation(ADD_USER);
  const handleCreateUser = async (userInfo: ICredentials) => {
    try {
      const response = await createUser({
        variables: {
          ...userInfo,
        },
      });
      return response?.data?.createUser;
    } catch ({ message }) {
      throw new Error((message as string) || 'SOMETHING_WENT_WRONG');
    }
  };
  return { handleCreateUser, loading };
};

function Field({ setUserInfo, title, ...props }: IPropsField) {
  const { t } = useTranslation();
  const handleChange = useHandleChange(setUserInfo);
  return (
    <div className="field">
      <span>{`${t(title)}`} : </span>
      <input {...props} placeholder={`${t(title)}`} onChange={handleChange} />
    </div>
  );
}

function Infos({ userInfo, setUserInfo }: IPropsInfos) {
  return (
    <>
      <Field
        title="login.USERNAME"
        name="username"
        type="text"
        valueOfInput={userInfo.username}
        setUserInfo={setUserInfo}
      />
      <Field
        title="login.EMAIL"
        name="email"
        type="text"
        valueOfInput={userInfo.email}
        setUserInfo={setUserInfo}
      />
      <Field
        title="login.PASSWORD"
        name="password"
        type="password"
        valueOfInput={userInfo.password}
        setUserInfo={setUserInfo}
      />
    </>
  );
}

function FormAddUser({
  children,
  setError,
  userInfo,
  setUsers,
  setAlertAddUser,
}: IPropsForm) {
  const { handleCreateUser, loading } = useCreateUser();

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    handleCreateUser(userInfo)
      .then(res => {
        setUsers(prev => [...prev, res]);
        setAlertAddUser(false);
      })
      .catch(({ message }) =>
        setError({
          status: true,
          message: (message as string) || 'SOMETHING_WENT_WRONG',
        }),
      );
  };
  return (
    <form onSubmit={handleAddUser}>
      {children}
      <Buttons
        setOpenedAlert={setAlertAddUser}
        loading={loading}
        action="actions.CREATE"
      />
    </form>
  );
}

function AddUserWrapper({ setAlertAddUser, setUsers }: IProps) {
  const [userInfo, setUserInfo] = useState<ICredentials>({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState({ status: false, message: '' });

  return (
    <Alert title="titles.NEW_USER_INFO">
      <FormAddUser
        setAlertAddUser={setAlertAddUser}
        setError={setError}
        setUsers={setUsers}
        userInfo={userInfo}
      >
        {error.status && <ErrorContainer message={error.message} />}
        <Infos setUserInfo={setUserInfo} userInfo={userInfo} />
      </FormAddUser>
    </Alert>
  );
}

export default AddUserWrapper;
