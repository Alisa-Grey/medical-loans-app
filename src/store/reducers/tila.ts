import { ITilaState, TilaActions } from '../types';
import { AgreementsActionsEnum } from '../actions/agreements';

const initialState: ITilaState = {
  tilaUrl: null,
  error: '',
};

function tilaReducer(state = initialState, action: TilaActions): ITilaState {
  switch (action.type) {
    case AgreementsActionsEnum.GET_TILA: {
      return { ...state };
    }
    case AgreementsActionsEnum.GET_TILA_SUCCESS: {
      return { ...state, tilaUrl: action.payload };
    }
    case AgreementsActionsEnum.GET_TILA_FAIL: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
}

export default tilaReducer;
