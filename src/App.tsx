import React, { FC, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, ThemeProvider } from '@mui/material';

import RegLayout from './components/common/layouts/regLayout';
import Layout from './components/common/layouts/mainLayout';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import SSNPage from './components/SSN';
import AcceptPage from './components/resultPages/Accepted';
import DeclinePage from './components/resultPages/Declined';
import Checking from './components/resultPages/Checking';
import LoansPage from './components/pages/LoansPage';
import ProfilePage from './components/pages/Profile';
import SecurityPage from './components/pages/SecurityPage';
import HistoryPage from './components/pages/HistoryPage';
import Footer from './components/footer/Footer';
import CustomAlert from './components/common/Alert';
import CodeVerificationPage from './components/codeVerificationPage';
import CurrentLoan from './components/pages/CurrentLoan';
import PlaidIntegration from './components/common/plaidConnection';

import { UserActionsEnum } from './store/actions/user';

import { theme } from './theme';
import './app.scss';
import RequireNewPassword from './components/resetPassword/RequireNewPasswordPage';
import ResetPassword from './components/resetPassword/ResetPasswordPage';
import ChoosePaymentMethod from './components/ChoosePaymentMethod';

const App: FC = () => {
  const dispatch = useDispatch();
  const changed = useSelector(
    (state: RootStateOrAny) => state.profile.isChanged
  );
  const SSNChange = useSelector((state: RootStateOrAny) => state.ssn);
  const wasRedirected = useSelector(
    (state: RootStateOrAny) => state.auth.wasRedirected
  );

  const SSN = localStorage.getItem('hasSSN');

  useEffect(() => {
    dispatch({ type: UserActionsEnum.GET_USER });
  }, [dispatch, changed, SSNChange]);

  const isAuth: boolean = useSelector(
    (state: RootStateOrAny) => state.auth.isAuth
  );
  const isLoading: boolean = useSelector(
    (state: RootStateOrAny) => state.auth.isLoading
  );

  const render = (el: JSX.Element): JSX.Element => {
    if (SSN === 'true' && isAuth) {
      return el;
    }
    if (SSN === 'false' && isAuth) {
      return <Navigate to='/ssn' />;
    }
    return <Navigate to='/login' />;
  };

  const renderPublic = (el: JSX.Element, targetEl: string): JSX.Element => {
    if (!isAuth) {
      return <RegLayout>{el}</RegLayout>;
    }
    return <Navigate to={targetEl} />;
  };

  const routes = [
    { path: '/', element: <Navigate to='/me/loans' /> },
    {
      path: '/register',
      element: renderPublic(<Registration />, '/ssn'),
    },
    {
      path: '/verify-code',
      element: renderPublic(<CodeVerificationPage />, '/me/loans'),
    },
    {
      path: '/login',
      element: renderPublic(<Login />, '/me/loans'),
    },
    {
      path: '/reset-password',
      element: renderPublic(<RequireNewPassword />, '/me/loans'),
    },
    {
      path: '/reset-password/:resetLink',
      element: renderPublic(<ResetPassword />, '/me/loans'),
    },
    {
      path: '/ssn',
      element:
        SSN === 'false' && !wasRedirected ? (
          <RegLayout>
            <SSNPage />
          </RegLayout>
        ) : (
          <Navigate to='/me/loans' />
        ),
    },
    {
      path: '/connect-plaid',
      element: render(
        <RegLayout>
          <PlaidIntegration />
        </RegLayout>
      ),
    },
    {
      path: '/ssn-checking',
      element: render(
        <RegLayout>
          <Checking />
        </RegLayout>
      ),
    },
    {
      path: '/checking-success',
      element: render(
        <RegLayout>
          <AcceptPage />
        </RegLayout>
      ),
    },
    {
      path: '/checking-error',
      element: render(
        <RegLayout>
          <DeclinePage />
        </RegLayout>
      ),
    },
    {
      path: '/me/loans',
      element: render(
        <Layout>
          <LoansPage />
        </Layout>
      ),
    },
    {
      path: '/me/profile',
      element: render(
        <Layout>
          <ProfilePage />
        </Layout>
      ),
    },
    {
      path: '/me/security',
      element: render(
        <Layout>
          <SecurityPage />
        </Layout>
      ),
    },
    {
      path: '/me/history',
      element: render(
        <Layout>
          <HistoryPage />
        </Layout>
      ),
    },
    {
      path: '/loans/:id',
      element: render(
        <Layout>
          <CurrentLoan />
        </Layout>
      ),
    },
    {
      path: 'payment-method',
      element: render(
        <RegLayout>
          <ChoosePaymentMethod />
        </RegLayout>
      ),
    },
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <>
          <CustomAlert />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
          <Footer />
        </>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
