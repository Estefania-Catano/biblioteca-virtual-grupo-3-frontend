import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'biblioteca-auth';
const SESSION_KEY = 'biblioteca_sesion_usuario';

const normalizeUser = (rawUser) => {
  if (!rawUser || typeof rawUser !== 'object') {
    return null;
  }

  const id = rawUser.id ?? rawUser.email ?? null;
  const email = typeof rawUser.email === 'string' ? rawUser.email : '';
  if (!id || !email) {
    return null;
  }

  const fallbackName = email.split('@')[0] || 'Usuario';
  return {
    id,
    email,
    name: typeof rawUser.name === 'string' && rawUser.name ? rawUser.name : fallbackName,
    rolDescripcion:
      typeof rawUser.rolDescripcion === 'string' ? rawUser.rolDescripcion : '',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const authUser = normalizeUser(JSON.parse(localStorage.getItem(AUTH_KEY)));
      if (authUser) {
        return authUser;
      }

      const sessionUser = normalizeUser(JSON.parse(localStorage.getItem(SESSION_KEY)));
      return sessionUser || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const login = (value) => {
    const nextUser =
      typeof value === 'string'
        ? normalizeUser({
            id: value.trim().toLowerCase(),
            email: value,
          })
        : normalizeUser(value);

    if (!nextUser) {
      return;
    }

    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout, isLogged: Boolean(user) }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
