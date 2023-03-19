import { LoanActionsEnum } from '../actions/loan';
import { ILoanState, LoanActions } from '../types';

const initialState: ILoanState = {
  isLoaded: false,
  loan: null,
  error: '',
};

function loanReducer(state = initialState, action: LoanActions): ILoanState {
  switch (action.type) {
    case LoanActionsEnum.GET_LOAN_SUCCESS: {
      return { ...state, isLoaded: true, loan: action.payload, error: '' };
    }
    case LoanActionsEnum.GET_LOAN_FAIL: {
      return { ...state, isLoaded: false, loan: null, error: action.payload };
    }
    default:
      return { ...state };
  }
}

export default loanReducer;
