import { useAppSelector } from './redux-hooks';

export function useAuthUser() {
  const { token, authData } = useAppSelector((state) => state.auth);

  return {
    authData: {
      token,
      authData,
    },
    userAuthToken: token,
  };
}
