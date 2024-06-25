import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = 'User';

  if (token) {
    const decoded = jwtDecode(token);
    const { username, email, role } = decoded.UserInfo;

    isManager = role.includes('Manager');
    isAdmin = role.includes('Admin');

    if (isManager) status = 'Manager';
    if (isAdmin) status = 'Admin';

    return { username, email, role, isManager, isAdmin };
  }

  return { username: '', email: '', role: '', isManager, isAdmin, status };
};

export default useAuth;
