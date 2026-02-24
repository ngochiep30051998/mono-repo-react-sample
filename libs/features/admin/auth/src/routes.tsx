import { RouteObject } from 'react-router';
import { loadable } from '@ui';

const Login = loadable(() => import('./pages/Login'));
const ForgotPassword = loadable(() => import('./pages/ForgotPassword'));
const Register = loadable(() => import('./pages/Register'));

export const AuthRouter: RouteObject = {
  path: '',
  children: [
    { path: 'login', element: <Login /> },
    { path: 'forgotPassword', element: <ForgotPassword /> },
    { path: 'register', element: <Register /> },
  ],
};
