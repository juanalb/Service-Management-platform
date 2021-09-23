import { createContext } from 'react';

export const AuthContext = createContext({
    auth: false,
    userId: null,
    setContextLogin: (userId: string, token: string, expirationDate?: Date) => {},
    setContextLogout: () => {}
});