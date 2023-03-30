import { io } from "socket.io-client";

const URL = process.env.REACT_APP_ANISH_SOCKET || "";
export const socket = io(URL);
