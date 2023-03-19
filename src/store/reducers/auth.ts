import { AuthActions, IAuthState } from '../types';
import { AuthActionsEnum } from '../actions/auth';
import { RegActionsEnum } from '../actions/register';
import { UserActionsEnum } from '../actions/user';

const initialState: IAuthState = {
  isLoading: true,
  isAuth: true,
  wasRedirected: false,
  authData: null,
  user: null,
  errors: {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
    address: '',
    email: '',
    password: '',
  },
  userError: '',
  codeError: '',
  hasSentCode: false,
};

function authReducer(state = initialState, action: AuthActions): IAuthState {
  switch (action.type) {
    case AuthActionsEnum.SIGN_IN_REQUEST: {
      return {
        ...state,
        isAuth: false,
        errors: {
          first_name: '',
          last_name: '',
          date_of_birth: '',
          phone_number: '',
          address: '',
          email: '',
          password: '',
        },
      };
    }
    case AuthActionsEnum.SIGN_IN_RESULT: {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    }
    case AuthActionsEnum.SIGN_IN_RESULT_REDIRECT: {
      return {
        ...state,
        isAuth: false,
        wasRedirected: true,
        authData: action.payload,
      };
    }
    case AuthActionsEnum.VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        wasRedirected: false,
        user: action.payload,
      };
    }
    case AuthActionsEnum.SIGN_IN_FAIL: {
      return {
        ...state,
        isAuth: false,
        user: null,
        errors: action.errors,
      };
    }
    case AuthActionsEnum.LOG_OUT: {
      return {
        ...state,
        isAuth: false,
        user: null,
        errors: {
          first_name: '',
          last_name: '',
          date_of_birth: '',
          phone_number: '',
          address: '',
          email: '',
          password: '',
        },
      };
    }
    case AuthActionsEnum.VERIFY_CODE_FAIL: {
      return {
        ...state,
        errors: {
          email: '',
          password: '',
        },
        codeError: action.payload,
      };
    }
    case AuthActionsEnum.SEND_CODE_ON_EMAIL_SUCCESS: {
      return {
        ...state,
        hasSentCode: true,
      };
    }
    case RegActionsEnum.REGISTER_REQUEST: {
      return { ...state, isAuth: false };
    }
    case RegActionsEnum.REGISTER_RESULT: {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        errors: {
          first_name: '',
          last_name: '',
          date_of_birth: '',
          phone_number: '',
          address: '',
          email: '',
          password: '',
        },
      };
    }
    case RegActionsEnum.REGISTER_FAIL: {
      return { ...state, isAuth: false, errors: action.payload };
    }
    case UserActionsEnum.GET_USER: {
      return { ...state, isLoading: true };
    }
    case UserActionsEnum.GET_USER_SUCCESS: {
      return { ...state, isAuth: true, user: action.payload, isLoading: false };
    }
    case UserActionsEnum.GET_USER_FAIL: {
      return {
        ...state,
        isAuth: false,
        user: null,
        userError: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
