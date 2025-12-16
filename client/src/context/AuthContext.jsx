import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const API_URL = "http://localhost:3000/api/auth";
  // Load lại mỗi khi load trang(F5):
  useEffect(() => {
    const checkUserStatus = () => {
      try {
        const token = sessionStorage.getItem("token");
        if(token) {
          const decodedUser = jwtDecode(token);

          setUser(decodedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Token bị lỗi hoặc không hợp lệ: ", err);
      } finally {
        setIsLoading(false);
      }
    }

    checkUserStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      console.log(res);

      const token = res.data.meta.token;
      if(!token) {
        throw new Error(
          "Lỗi không có token được trả về!"
        )
      }
      sessionStorage.setItem("token", token);

      const decodedUser = jwtDecode(token);
      console.log("Token được giải mã: ", decodedUser);
      setUser(decodedUser);
      setIsLoggedIn(true);
      return decodedUser;
    } catch (error) {
      const message = error.response?.data?.message || "Đăng nhập thất bại!";
      alert(message);
      console.error(error);
      return false;
    }
  };

  //Logout là xóa sạch dấu vết user ở trang web.
  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  //register sẽ gửi thông tin lên phía backend.
  const register = async (userData) => {
    try {
      // userData = {email, password, confirmPassword, role};
      const res = await axios.post(`${API_URL}/register`, userData);

      return {success: true, message: res.data.message};
    } catch (error) {
      console.error("Register Error:", err);
      const message = err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      return { success: false, message };
    }
  };

  if(isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, setUser, setIsLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook tiện dụng để dùng trong component
export const useAuth = () => useContext(AuthContext);
