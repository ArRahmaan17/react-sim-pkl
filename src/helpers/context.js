import { io } from 'socket.io-client';
import { createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
export const socketContext = createContext(io("http://127.0.0.1:3001"));
let validToken = false;
let token = "";
if (localStorage.getItem("accessToken") !== null) {
    token = localStorage.getItem("accessToken");
    token = jwtDecode(token);
    if (token.hasOwnProperty('lifetime') && token.lifetime > moment().unix()) {
        validToken = true
    }
}
export { token, validToken };