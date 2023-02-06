import { useQuery } from '@apollo/client';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { AppContextProps } from '../interfaces';
import { GET_RISK_CATEGORIES } from '../requests/queries';
import { initState } from '../utils/constants';
import { GET_ALL_RISK_CATEGORIES_ACTION } from './appActions';
import appReducer from './appReducer';

export const AppContext = createContext<AppContextProps>(initState);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [{ riskCategories }, dispatch] = useReducer(appReducer, initState);
  const { data } = useQuery(GET_RISK_CATEGORIES);

  useEffect(() => {
    dispatch(GET_ALL_RISK_CATEGORIES_ACTION(data?.getRiskCategories));
  }, [data, dispatch]);

  const value = useMemo(() => ({ riskCategories, dispatch }), [riskCategories]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
