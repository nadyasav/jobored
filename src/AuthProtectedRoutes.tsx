import { Outlet } from 'react-router-dom';

import { useAuthUser } from './hooks/useAuthUser';
import { Preloader } from './components/preloader/Preloader';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux-hooks';
import { login } from './store/auth-slice';
import { userData } from './constants/constants';

export const AuthProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  const { userAuthToken } = useAuthUser();

  useEffect(() => {
    if (!userAuthToken) {
      dispatch(login(userData));
    }
  }, []);

  if (!userAuthToken) {
    return <Preloader />;
  }

  return <Outlet />;
};
