import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { UserActionsEnum } from '../actions/user';
import { IResponseGenerator, ReturnSagaType } from '../types';

const getUser = function* (): ReturnSagaType<
  UserActionsEnum,
  IResponseGenerator
> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    if (token) {
      headers.append('Authorization', token);
    }

    let data = yield fetch(`${process.env.REACT_APP_API_URL}/api/auth/client`, {
      method: 'GET',
      headers: headers,
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    });

    yield put({
      type: UserActionsEnum.GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: UserActionsEnum.GET_USER_FAIL, payload: error });
  }
};

const watchGetUser = function* (): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(UserActionsEnum.GET_USER, getUser);
};

export default watchGetUser;
