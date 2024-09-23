import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, postRequest } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });


    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('user');

        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const register = useCallback(async () => {
        setIsRegisterLoading(true);
        setRegisterError(null);
        const response = await postRequest(`${baseUrl}/users/register`,
            JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if (response.error) {
            setRegisterError(response);
        }

        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    const login = useCallback(async () => {
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`,
            JSON.stringify(loginInfo));

        setIsLoginLoading(false);

        if (response.error) {
            return setLoginError(response);
        }

        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
    }, [loginInfo])

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            register,
            registerError,
            isRegisterLoading,
            logout,
            login,
            loginInfo,
            loginError,
            updateLoginInfo,
            isLoginLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
};