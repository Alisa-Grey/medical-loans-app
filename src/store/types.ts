import { NavigateFunction } from 'react-router-dom';
import { PutEffect } from 'redux-saga/effects';
import { AgreementsActionsEnum } from './actions/agreements';
import { AlertActionsEnum } from './actions/alert';
import { AuthActionsEnum } from './actions/auth';
import { LoanActionsEnum } from './actions/loan';
import { PaymentMethodActionsEnum } from './actions/paymentMethod';
import { PlaidTokenActionsEnum } from './actions/plaidToken';
import { RegActionsEnum } from './actions/register';
import { ResetPasswordActionsEnum } from './actions/resetPassword';
import { SsnActionsEnum } from './actions/ssn';
import { UserActionsEnum } from './actions/user';

export interface IUser {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  phone_number?: string;
  address?: string;
  SSN?: string;
  loans: ILoan[];
}

export interface ILoan {
  status: string;
  isMedicalBillVerified: boolean;
  isProofPaymentVerified: boolean;
  amount: number;
  interest: number;
  outstandingPrincipal: number;
  accuredInterest: number;
  paymentReceived: number;
  paymentDueDate: Date;
  medicalBill: string;
  proofPayment: string;
  createdAt: Date | string;
  id: number;
  term: string;
}
export interface IResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number | string;
  message?: string;
  errors?: any;
  token: string;
  SSN?: string;
}

export type ReturnSagaType<T, P> = Generator<
  PutEffect<{
    type: T;
    payload?: P;
    errors?: any;
  }>,
  void,
  IResponseGenerator
> | void;

export interface IAction {
  type: string;
  payload?: any;
}

export interface IAuthState {
  isLoading: boolean;
  wasRedirected?: boolean;
  isAuth: boolean;
  user: IUser | null;
  authData: {
    email: string;
    status: string;
  } | null;
  errors: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
    email?: string;
    password?: string;
  };
  userError: string;
  codeError: string;
  hasSentCode: boolean;
}

export interface ISignIn {
  type: typeof AuthActionsEnum.SIGN_IN_REQUEST;
  userData: {
    email: string;
    password: string;
  };
  actionHistory: NavigateFunction;
}

export interface ISignInRedirect {
  type: typeof AuthActionsEnum.SIGN_IN_RESULT_REDIRECT;
  payload: {
    email: string;
    status: string;
  };
  actionHistory: NavigateFunction;
}

export interface ISignInResponse {
  email: string;
  id: number;
  token: string;
  status?: string;
}

export interface ISignResult {
  type: typeof AuthActionsEnum.SIGN_IN_RESULT;
  payload: IUser;
}

export interface ISignInFail {
  type: AuthActionsEnum.SIGN_IN_FAIL;
  errors: {
    email?: string;
    password?: string;
  };
}

export interface ILogOut {
  type: typeof AuthActionsEnum.LOG_OUT;
}

export interface IRegister {
  type: typeof RegActionsEnum.REGISTER_REQUEST;
  data: { [key: string]: any };
  actionHistory: NavigateFunction;
}

export interface IRegisterResult {
  type: typeof RegActionsEnum.REGISTER_RESULT;
  payload: IUser;
}

export interface IRegisterFail {
  type: typeof RegActionsEnum.REGISTER_FAIL;
  payload: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
    email?: string;
    password?: string;
  };
}

export interface ISsnState {
  approved: string;
  error?: string;
}

export interface ISsnAdd {
  type: SsnActionsEnum.ADD_SSN;
  payload: string;
  actionHistory: NavigateFunction;
}

export interface ISsnSuccess {
  type: SsnActionsEnum.ADD_SSN_SUCCESS;
  payload: string;
}

export interface ISsnFail {
  type: SsnActionsEnum.ADD_SSN_FAIL;
  payload: string;
}

export type SsnActions = ISsnAdd | ISsnSuccess | ISsnFail;

export interface IUserState {
  isAuth: boolean;
  user: IUser | null;
  error: string;
}

export interface IGetUser {
  type: UserActionsEnum.GET_USER;
  payload: string;
}

export interface IGetUserSuccess {
  type: UserActionsEnum.GET_USER_SUCCESS;
  payload: IUser;
}

export interface IGetUserFail {
  type: UserActionsEnum.GET_USER_FAIL;
  payload: string;
}

export interface IVerifyCode {
  type: AuthActionsEnum.VERIFY_CODE;
  payload: {
    code: number;
    accessToken: string;
  };
}

export interface IVerifyCodeSuccess {
  type: AuthActionsEnum.VERIFY_CODE_SUCCESS;
  payload: IUser;
}
export interface IVerifyCodeFail {
  type: AuthActionsEnum.VERIFY_CODE_FAIL;
  payload: string;
}

export interface IRememberDevice {
  type: AuthActionsEnum.REMEMBER_DEVICE;
  payload: {
    accessToken: string;
    email: string;
  };
}

export interface ISendCodeOnEmail {
  type: AuthActionsEnum.SEND_CODE_ON_EMAIL;
  payload: {
    email: string;
    accessToken: string;
  };
}

export interface ISendCodeSuccess {
  type: AuthActionsEnum.SEND_CODE_ON_EMAIL_SUCCESS;
}

export type AuthActions =
  | ISignIn
  | ISignResult
  | ISignInFail
  | IRegister
  | IRegisterResult
  | IRegisterFail
  | ILogOut
  | IGetUser
  | IGetUserSuccess
  | IGetUserFail
  | IVerifyCode
  | IVerifyCodeSuccess
  | IVerifyCodeFail
  | ISendCodeOnEmail
  | ISendCodeSuccess
  | IRememberDevice
  | ISignInRedirect;

export interface IProfileState {
  isChanged: boolean;
  user: IUser | null;
  errors: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
    email?: string;
    current_password?: string;
  };
  changePsswrdResult?: string;
}
export interface IUpdate {
  type: UserActionsEnum.UPDATE_DATA;
  data: { [key: string]: string };
}

export interface IUpdateSuccess {
  type: UserActionsEnum.UPDATE_DATA_SUCCESS;
  payload: IUser;
}
export interface IUpdateFail {
  type: UserActionsEnum.UPDATE_DATA_FAIL;
  payload: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone_number?: string;
    address?: string;
    email?: string;
  };
}

export interface IAlertState {
  isOpened: boolean;
  message: string;
  severity: 'error' | 'success' | undefined;
}

export interface IShowAlert {
  type: AlertActionsEnum.SHOW_ALERT;
  payload: {
    message: string;
    severity: 'error' | 'success';
  };
}

export interface IHideAlert {
  type: AlertActionsEnum.HIDE_ALERT;
}

export type AlertActions = IShowAlert | IHideAlert;
export interface IChangePassword {
  type: UserActionsEnum.CHANGE_PASSWORD;
  payload: {
    current_password: string;
    new_password: string;
    repeat_password: string;
  };
}

export interface IChangePasswordSuccess {
  type: UserActionsEnum.CHANGE_PASSWORD_SUCCESS;
  payload: string;
}

export interface IChangePasswordFail {
  type: UserActionsEnum.CHANGE_PASSWORD_FAIL;
  errors: {
    current_password?: string;
  };
}

export type ProfileActions =
  | IUpdate
  | IUpdateFail
  | IUpdateSuccess
  | IChangePassword
  | IChangePasswordSuccess
  | IChangePasswordFail;

export interface ILoanState {
  isLoaded: boolean;
  loan: ILoan | null;
  error: string;
}
export interface IGetLoan {
  type: LoanActionsEnum.GET_LOAN;
  payload: string;
}

export interface IGetLoanSuccess {
  type: LoanActionsEnum.GET_LOAN_SUCCESS;
  payload: ILoan;
}

export interface IGetLoanFail {
  type: LoanActionsEnum.GET_LOAN_FAIL;
  payload: string;
}

export type LoanActions = IGetLoan | IGetLoanSuccess | IGetLoanFail;

export interface IPlaidTokenState {
  linkToken: string;
  plaidConnected: boolean;
  error: string;
}

export interface IGenerateToken {
  type: PlaidTokenActionsEnum.GENERATE_TOKEN;
}

export interface IGenerateTokenSuccess {
  type: PlaidTokenActionsEnum.GENERATE_TOKEN_SUCCESS;
  payload: string;
}

export interface IGenerateTokenFail {
  type: PlaidTokenActionsEnum.GENERATE_TOKEN_FAIL;
  payload: string;
}

export interface IExchangeToken {
  type: PlaidTokenActionsEnum.EXCHANGE_TOKEN;
  payload: { [key: string]: string };
  actionHistory: NavigateFunction;
}

export interface IExchangeTokenSuccess {
  type: PlaidTokenActionsEnum.EXCHANGE_TOKEN_SUCCESS;
  payload: boolean;
}

export interface IExchangeTokenFail {
  type: PlaidTokenActionsEnum.EXCHANGE_TOKEN_FAIL;
  payload: string;
}

export type PlaidTokenActions =
  | IGenerateToken
  | IGenerateTokenSuccess
  | IGenerateTokenFail
  | IExchangeToken
  | IExchangeTokenSuccess
  | IExchangeTokenFail;

export interface IResetPasswordSate {
  codeWasSent: boolean;
  result: string;
  email: string;
  linkIsValid: boolean;
  errors: {
    email?: string;
    password?: string;
  };
}

export interface IRequireNewPassword {
  type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD;
  payload: string;
}

export interface IRequireNewPasswordSuccess {
  type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_SUCCESS;
  payload: string;
}

export interface IRequireNewPasswordFail {
  type: ResetPasswordActionsEnum.REQUIRE_NEW_PASSWORD_FAIL;
  error: string;
}
export interface IResetPassword {
  type: ResetPasswordActionsEnum.RESET_PASSWORD;
  payload: {
    password: string;
    password_repeat: string;
  };
  token: string;
  email: string;
  actionHistory: NavigateFunction;
}

export interface IResetPasswordSuccess {
  type: ResetPasswordActionsEnum.RESET_PASSWORD_SUCCESS;
  payload: string;
}

export interface IResetPasswordFail {
  type: ResetPasswordActionsEnum.RESET_PASSWORD_FAIL;
  error: string;
}

export interface ICheckLink {
  type: ResetPasswordActionsEnum.CHECK_LINK;
  token: string;
  email: string;
}

export interface ICheckLinkSuccess {
  type: ResetPasswordActionsEnum.CHECK_LINK_SUCCESS;
  payload: string;
}

export interface ICheckLinkFail {
  type: ResetPasswordActionsEnum.CHECK_LINK_FAIL;
  error: string;
}

export type ResetPasswordActions =
  | IRequireNewPassword
  | IRequireNewPasswordSuccess
  | IRequireNewPasswordFail
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordFail
  | ICheckLink
  | ICheckLinkSuccess
  | ICheckLinkFail;

export interface IPaymentMethodState {
  isPaymentMethodSet: boolean;
  error: string;
}
export interface ISetPaymentMethod {
  type: PaymentMethodActionsEnum.SET_PAYMENT_METHOD;
  payload: boolean;
  actionHistory: NavigateFunction;
}

export interface ISetPaymentMethodSuccess {
  type: PaymentMethodActionsEnum.SET_PAYMENT_METHOD_SUCCESS;
  payload: boolean;
}

export interface ISetPaymentMethodFail {
  type: PaymentMethodActionsEnum.SET_PAYMENT_METHOD_FAIL;
  payload: string;
}

export type PaymentMethodActions =
  | ISetPaymentMethod
  | ISetPaymentMethodSuccess
  | ISetPaymentMethodFail;

export interface ITilaState {
  tilaUrl: string | null;
  error: string;
}
export interface IGetTila {
  type: AgreementsActionsEnum.GET_TILA;
  actionHistory: NavigateFunction;
}

export interface IGetTilaSuccess {
  type: AgreementsActionsEnum.GET_TILA_SUCCESS;
  payload: any;
}

export interface IGetTilaFail {
  type: AgreementsActionsEnum.GET_TILA_FAIL;
  payload: string;
}

export type TilaActions = IGetTila | IGetTilaSuccess | IGetTilaFail;
