import { PaymentMethodActionsEnum } from '../actions/paymentMethod';
import { IPaymentMethodState, PaymentMethodActions } from '../types';

const initialState: IPaymentMethodState = {
  isPaymentMethodSet: false,
  error: '',
};

function paymentMethodReducer(
  state = initialState,
  action: PaymentMethodActions
): IPaymentMethodState {
  switch (action.type) {
    case PaymentMethodActionsEnum.SET_PAYMENT_METHOD: {
      return { ...state };
    }
    case PaymentMethodActionsEnum.SET_PAYMENT_METHOD_SUCCESS: {
      return { ...state, isPaymentMethodSet: action.payload };
    }
    case PaymentMethodActionsEnum.SET_PAYMENT_METHOD_FAIL: {
      return { ...state, isPaymentMethodSet: false, error: action.payload };
    }
    default:
      return { ...state };
  }
}

export default paymentMethodReducer;
