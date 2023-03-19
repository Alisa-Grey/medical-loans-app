import { IGetTila, IResponseGenerator, ReturnSagaType } from '../types';
import { AgreementsActionsEnum } from '../actions/agreements';
import { AlertActionsEnum } from '../actions/alert';
import { ForkEffect, put, takeEvery } from 'redux-saga/effects';

const getTila = function* ({
  actionHistory,
}: IGetTila): ReturnSagaType<AgreementsActionsEnum, IResponseGenerator> {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    let headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    if (token) {
      headers.append('Authorization', token);
    }
    let objectURL;
    yield fetch(`${process.env.REACT_APP_API_URL}/api/tila`, {
      method: 'GET',
      headers: headers,
    }).then(async (response) => {
      if (!response.ok) {
        let resData = await response.json();
        const error = resData.message || response.status;
        return Promise.reject(error);
      } else {
        let resBlob = await response.blob();
        objectURL = URL.createObjectURL(resBlob);
        return objectURL;
      }
    });

    yield put({
      type: AgreementsActionsEnum.GET_TILA_SUCCESS,
      payload: objectURL,
    });
  } catch (error: any) {
    yield put({
      type: AgreementsActionsEnum.GET_TILA_FAIL,
      payload: error,
    });
    yield put({
      type: AlertActionsEnum.SHOW_ALERT,
      payload: { message: error, severity: 'error' },
    });
  }
};

const watchGetTila = function* (): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(AgreementsActionsEnum.GET_TILA, getTila);
};

export default watchGetTila;
