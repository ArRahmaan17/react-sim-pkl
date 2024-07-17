import { io } from 'socket.io-client';
import { createContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
let env = require("../config/config.json")

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
export const socketContext = createContext(io(env.backend_url));
let validToken = false;
let token = "";
let userContext = "";
if (localStorage.getItem("accessToken") !== null) {
    token = localStorage.getItem("accessToken");
    userContext = jwtDecode(token);
    if (userContext.hasOwnProperty('lifetime') && userContext.lifetime > moment().unix()) {
        validToken = true
    }
}
export { token, validToken, userContext };