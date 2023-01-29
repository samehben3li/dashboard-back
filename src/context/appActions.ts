import { IRiskCategory } from '../interfaces';

export const GET_ALL_RISK_CATEGORIES = (riskCategories: IRiskCategory[]) => ({
  type: 'GET_ALL_RISK_CATEGORIES',
  payload: { riskCategories },
});

export const DELETE_RISK_CATEGORY = () => ({
  type: 'DELETE_RISK_CATEGORY',
});
