import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Vite proxy or full URL if not using proxy
  timeout: 60_000,
});

// We'll let the AuthContext set the token when user logs in by setting default header.
export function setAuthToken(token) {
  if (token)
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete instance.defaults.headers.common["Authorization"];
}

export default instance;
