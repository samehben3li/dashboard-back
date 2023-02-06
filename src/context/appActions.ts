import { IRiskCategory } from '../interfaces';

export const GET_ALL_RISK_CATEGORIES_ACTION = (
  riskCategories: IRiskCategory[],
) => ({
  type: 'GET_ALL_RISK_CATEGORIES',
  payload: { riskCategories },
});

export const DELETE_RISK_CATEGORY_ACTION = (id: string) => ({
  type: 'DELETE_RISK_CATEGORY',
  payload: { id },
});

export const ADD_RISK_CATEGORY_ACTION = (riskCategory: IRiskCategory) => ({
  type: 'ADD_RISK_CATEGORY',
  payload: { riskCategory },
});
