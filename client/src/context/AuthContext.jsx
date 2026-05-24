import { useCallback, useEffect, useMemo, useState } from "react";
import { TOKEN_STORAGE_KEY } from "../utils/constants";
import { AuthContext } from "./auth-context";
import { getMe, loginRequest, registerRequest } from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(sessionStorage.getItem(TOKEN_STORAGE_KEY)));

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    const onUnauthorized = () => logout();
    window.addEventListener("mindcare:unauthorized", onUnauthorized);
    return () => window.removeEventListener("mindcare:unauthorized", onUnauthorized);
  }, [logout]);

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) return undefined;

    let cancelled = false;
    getMe()
      .then((res) => {
        if (!cancelled) setUser(res.data.user);
      })
      .catch(() => {
        if (!cancelled) {
          sessionStorage.removeItem(TOKEN_STORAGE_KEY);
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const applySession = useCallback((token, userData) => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUser(userData);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const { data } = await loginRequest(credentials);
      applySession(data.token, data.user);
      return data.user;
    },
    [applySession]
  );

  const register = useCallback(
    async (payload) => {
      const { data } = await registerRequest(payload);
      applySession(data.token, data.user);
      return data.user;
    },
    [applySession]
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
