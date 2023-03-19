import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AlertActionsEnum } from '../actions/alert';
import { LoanActionsEnum } from '../actions/loan';
import { IGetLoan, IResponseGenerator, ReturnSagaType } from '../types';

const getLoan = function* ({
  payload,
}: IGetLoan): ReturnSagaType<LoanActionsEnum, IResponseGenerator> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    let response = yield fetch(
      `${process.env.REACT_APP_API_URL}/api/client/loans/${payload}`,
      {
        method: 'GET',
        headers: headers,
      }
    ).then(async (response) => {
      let resData = await response.json();

      if (!response.ok) {
        const error = resData.error || response.status;
        return Promise.reject(error);
      }
      return resData;
    });

    yield put({
      type: LoanActionsEnum.GET_LOAN_SUCCESS,
      payload: response,
    });
  } catch (error: any) {
    yield put({ type: LoanActionsEnum.GET_LOAN_FAIL, payload: error });

    if (error.message) {
      yield put({
        type: AlertActionsEnum.SHOW_ALERT,
        payload: { message: 'Network error', severity: 'error' },
      });
    }
  }
};

const watchGetLoan = function* (): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(LoanActionsEnum.GET_LOAN, getLoan);
};

export default watchGetLoan;
