import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { PlaidTokenActionsEnum } from '../../actions/plaidToken';
import {
  IResponseGenerator,
  PlaidTokenActions,
  ReturnSagaType,
} from '../../types';

const generateToken = function* (): ReturnSagaType<
  PlaidTokenActions,
  IResponseGenerator
> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    const response = yield fetch(
      'http://127.0.0.1:5000/api/create_link_token',
      {
        method: 'POST',
        headers: headers,
      }
    ).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = data.error || response.status;
        return Promise.reject(error);
      }
      return data;
    });

    yield put({
      type: PlaidTokenActionsEnum.GENERATE_TOKEN_SUCCESS,
      payload: response.link_token,
    });
  } catch (error: any) {
    yield put({
      type: PlaidTokenActionsEnum.GENERATE_TOKEN_FAIL,
      payload: error,
    });
  }
};

const watchGenerateToken = function* (): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeEvery(PlaidTokenActionsEnum.GENERATE_TOKEN, generateToken);
};

export default watchGenerateToken;
