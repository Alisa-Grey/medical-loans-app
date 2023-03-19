import { UserActionsEnum } from '../actions/user';
import { IProfileState, ProfileActions } from '../types';

const initialState: IProfileState = {
  isChanged: false,
  user: null,
  errors: {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    address: '',
    phone_number: '',
    current_password: '',
  },
  changePsswrdResult: '',
};

function profileReducer(
  state = initialState,
  action: ProfileActions
): IProfileState {
  switch (action.type) {
    case UserActionsEnum.UPDATE_DATA: {
      return { ...state, isChanged: false };
    }
    case UserActionsEnum.UPDATE_DATA_SUCCESS: {
      return {
        ...state,
        isChanged: true,
        user: action.payload,
        errors: {
          first_name: '',
          last_name: '',
          date_of_birth: '',
          email: '',
          phone_number: '',
          address: '',
          current_password: '',
        },
        changePsswrdResult: '',
      };
    }
    case UserActionsEnum.UPDATE_DATA_FAIL: {
      return { ...state, isChanged: false, errors: action.payload };
    }
    case UserActionsEnum.CHANGE_PASSWORD_SUCCESS: {
      return { ...state, changePsswrdResult: action.payload };
    }
    case UserActionsEnum.CHANGE_PASSWORD_FAIL: {
      return { ...state, errors: action.errors };
    }
    default:
      return { ...state };
  }
}

export default profileReducer;
