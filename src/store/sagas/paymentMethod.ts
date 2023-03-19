import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../actions/alert';
import { PaymentMethodActionsEnum } from '../actions/paymentMethod';
import {
  IResponseGenerator,
  ISetPaymentMethod,
  ReturnSagaType,
} from '../types';

const setPaymentMethod = function* ({
  payload,
  actionHistory,
}: ISetPaymentMethod): ReturnSagaType<
  PaymentMethodActionsEnum,
  IResponseGenerator
> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    yield fetch(`${process.env.REACT_APP_API_URL}/api/payment-method`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ useDwolla: payload }),
    }).then(async (response) => {
      let resData = await response.json();
      if (!response.ok) {
        const error = resData.message || response.status;
        return Promise.reject(error);
      }
      return resData;
    });
    yield put({
      type: PaymentMethodActionsEnum.SET_PAYMENT_METHOD_SUCCESS,
      payload: true,
      actionHistory: actionHistory('/me/loans'),
    });
  } catch (error: any) {
    yield put({
      type: PaymentMethodActionsEnum.SET_PAYMENT_METHOD_FAIL,
      payload: error,
    });

    if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message: error.message,
          severity: 'error',
        },
      });
    } else {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: {
          message: error,
          severity: 'error',
        },
      });
    }
  }
};

const watchSetPaymentMethod = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(
    PaymentMethodActionsEnum.SET_PAYMENT_METHOD,
    setPaymentMethod
  );
};

export default watchSetPaymentMethod;
