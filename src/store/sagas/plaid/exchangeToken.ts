import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../../actions/alert';
import { PlaidTokenActionsEnum } from '../../actions/plaidToken';
import {
  IExchangeToken,
  IResponseGenerator,
  PlaidTokenActions,
  ReturnSagaType,
} from '../../types';

const exchangeToken = function* ({
  payload,
  actionHistory,
}: IExchangeToken): ReturnSagaType<PlaidTokenActions, IResponseGenerator> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    yield fetch(`http://127.0.0.1:5000/api/exchange_public_token`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        public_token: payload.public_token,
        account_id: payload.account_id,
      }),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = data.error || response.status;
        return Promise.reject(error);
      }
      return data;
    });
    yield put({
      type: PlaidTokenActionsEnum.EXCHANGE_TOKEN_SUCCESS,
      payload: true,
      actionHistory: actionHistory('/checking-success'),
    });
  } catch (error: any) {
    yield put({
      type: PlaidTokenActionsEnum.EXCHANGE_TOKEN_FAIL,
      payload: error.message,
    });
    yield put({
      type: AlertActionsEnum.SHOW_ALERT,
      payload: {
        message: 'Something went wrong, please try again',
        severity: 'error',
      },
    });
  }
};

const watchExchangeToken = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(PlaidTokenActionsEnum.EXCHANGE_TOKEN, exchangeToken);
};

export default watchExchangeToken;
