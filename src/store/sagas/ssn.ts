import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../actions/alert';
import { SsnActionsEnum } from '../actions/ssn';
import { IResponseGenerator, ISsnAdd, ReturnSagaType } from '../types';

const addSsn = function* ({
  payload,
  actionHistory,
}: ISsnAdd): ReturnSagaType<SsnActionsEnum, IResponseGenerator> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    let response: IResponseGenerator = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/ssn`,
      {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ SSN: payload }),
      }
    ).then(async (response) => {
      let resData = await response.json();

      if (!response.ok) {
        const errors = resData.errors || response.status;
        return Promise.reject(errors);
      }
      return resData;
    });

    yield put({
      type: SsnActionsEnum.ADD_SSN_SUCCESS,
      payload: response.message,
      actionHistory: actionHistory('/ssn-checking'),
    });
    localStorage.setItem('hasSSN', 'true');
  } catch (errors: any) {
    yield put({
      type: SsnActionsEnum.ADD_SSN_FAIL,
      payload: errors,
    });
    if (errors.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: 'Network error', severity: 'error' },
      });
    }
  }
};

const watchAddSsn = function* (): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SsnActionsEnum.ADD_SSN, addSsn);
};

export default watchAddSsn;
