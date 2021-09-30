import { createContext } from 'react';

export const AuthContext = createContext({
    auth: false,
    userId: "",
    setContextLogin: (userId: string, token: string, expirationDate?: Date) => {},
    setContextLogout: () => {}
});