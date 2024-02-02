import { io } from 'socket.io-client';
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
export const socketContext = createContext(io("http://127.0.0.1:3001"));