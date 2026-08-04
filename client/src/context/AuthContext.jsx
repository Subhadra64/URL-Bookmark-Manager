import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { const load = async () => { if (!localStorage.getItem('bookmark_token')) return setLoading(false); try { setUser(await authService.fetchMe()); } catch { localStorage.removeItem('bookmark_token'); } finally { setLoading(false); } }; load(); }, []);
  const authenticate = async (action, values) => { const { user: nextUser, token } = await action(values); localStorage.setItem('bookmark_token', token); setUser(nextUser); };
  const logout = () => { localStorage.removeItem('bookmark_token'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login: (v) => authenticate(authService.login, v), register: (v) => authenticate(authService.register, v), logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
