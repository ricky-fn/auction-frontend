import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user);

  // Add any additional checks you need for authentication
  const isLoggedIn = user.userId;

  return isLoggedIn;
};