import { IAction, IRiskCategory, IState } from '../interfaces';

const appReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'GET_ALL_RISK_CATEGORIES':
      return {
        ...state,
        riskCategories: action.payload.riskCategories as IRiskCategory[],
      };
    case 'DELETE_RISK_CATEGORY': {
      return {
        ...state,
        riskCategories: state.riskCategories?.filter(
          riskCategory => riskCategory.id !== action.payload.id,
        ),
      };
    }
    case 'ADD_RISK_CATEGORY': {
      return {
        ...state,
        riskCategories: [
          ...state.riskCategories,
          action.payload.riskCategory as IRiskCategory,
        ],
      };
    }
    case 'DELETE_RISK_CATEGORY_TYPE': {
      const newRiskCategories = state.riskCategories.map(riskCategory => {
        if (riskCategory.id === action.payload.id) {
          return {
            ...riskCategory,
            riskCategoryTypes: riskCategory.riskCategoryTypes.filter(
              type => type.id !== action.payload.idType,
            ),
          };
        }
        return riskCategory;
      });
      return {
        ...state,
        riskCategories: [...newRiskCategories],
      };
    }
    default:
      return state;
  }
};

export default appReducer;
