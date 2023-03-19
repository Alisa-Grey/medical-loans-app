import { SsnActionsEnum } from '../actions/ssn';
import { ISsnState, SsnActions } from '../types';

const initialState: ISsnState = {
  approved: '',
  error: '',
};

function ssnReducer(state = initialState, action: SsnActions): ISsnState {
  switch (action.type) {
    case SsnActionsEnum.ADD_SSN: {
      return { ...state };
    }
    case SsnActionsEnum.ADD_SSN_SUCCESS: {
      return { ...state, approved: action.payload };
    }
    case SsnActionsEnum.ADD_SSN_FAIL: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
}

export default ssnReducer;
