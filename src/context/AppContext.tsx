import React, { createContext, ReactNode, useMemo, useReducer } from 'react';
import { AppContextProps } from '../interfaces';
import { initState } from '../utils/constants';
import appReducer from './appReducer';

export const AppContext = createContext<AppContextProps>(initState);

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [{ riskCategories }, dispatch] = useReducer(appReducer, initState);

  const value = useMemo(() => ({ riskCategories, dispatch }), [riskCategories]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
