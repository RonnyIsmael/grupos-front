import axios from 'axios';
import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    await axios
      .post('http://192.168.100.173:8080/login', {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
      })
      .catch(e => console.log('Error: ' + e));
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
