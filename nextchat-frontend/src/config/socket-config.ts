import { io } from "socket.io-client";

const socket = io(process.env.PUBLIC_BACKEND_URL);
export default socket;

export function checkSocketEnvVar() {
  const socket = process.env.PUBLIC_BACKEND_URL;

  if (!socket) {
    throw new Error(
      "Missing backend URI. Please set NEXT_PUBLIC_BACKEND in your .env.local file."
    );
  }
}
