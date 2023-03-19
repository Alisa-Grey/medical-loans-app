import { ResetPasswordActionsEnum } from '../actions/resetPassword';
import { IResetPasswordSate, ResetPasswordActions } from '../types';

const initialState: IResetPasswordSate = {
  codeWasSent: false,
  result: '',
  email: '',
  linkIsValid: false,
  errors: {
    email: '',
    password: '',
  },
};

function resetPasswordReducer(
  state = initialState,
  action: ResetPasswordActions
): IResetPasswordSate {
  switch (action.type) {
    case ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD: {
      return { ...state };
    }
    case ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_SUCCESS: {
      return { ...state, codeWasSent: true, email: action.payload };
    }
    case ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_FAIL: {
      return { ...state, codeWasSent: false, errors: { email: action.error } };
    }
    case ResetPasswordActionsEnum.RESET_PASSWORD_SUCCESS: {
      return { ...state, result: action.payload, codeWasSent: false };
    }
    case ResetPasswordActionsEnum.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        errors: { password: action.error },
        codeWasSent: false,
      };
    }
    case ResetPasswordActionsEnum.CHECK_LINK_SUCCESS: {
      return { ...state, linkIsValid: true };
    }
    case ResetPasswordActionsEnum.CHECK_LINK_FAIL: {
      return { ...state, linkIsValid: false };
    }
    default:
      return { ...state };
  }
}

export default resetPasswordReducer;
