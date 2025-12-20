import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    setIsLoggedIn(true);
    if (token) {
      // 1. Lưu token vào localStorage hoặc Cookie
      sessionStorage.setItem('token', token);
      
      // 2. Redirect user về trang chủ hoặc dashboard
      navigate('/');
    }
  }, []);

  return <div>Đang xử lý đăng nhập...</div>;
}

export default AuthCallback;