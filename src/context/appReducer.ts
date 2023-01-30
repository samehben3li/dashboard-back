import { IAction, IState } from '../interfaces';

const appReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'GET_ALL_RISK_CATEGORIES':
      return {
        ...state,
        riskCategories: action.payload.riskCategories,
      };
    case 'DELETE_RISK_CATEGORY': {
      return {
        ...state,
        riskCategories: state.riskCategories?.filter(
          riskCategory => riskCategory.id !== action.payload.id,
        ),
      };
    }
    default:
      return state;
  }
};

export default appReducer;
