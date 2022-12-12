import { createContext } from 'react';

export const AuthContext = createContext({
    auth: false,
    userId: "",
    role: "",
    setContextLogin: (userId: string, token: string, role: string, expirationDate?: Date) => {},
    setContextLogout: () => {}
});