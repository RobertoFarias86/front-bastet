'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';


interface User {
  id: number;
  nome?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<number>; 
  logout: () => Promise<void>; 
}

interface ProtectedResponse {
  id: number;
  nome: string;
  email: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<ProtectedResponse>('/protegida', {
          withCredentials: true
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  
  async function login(email: string, senha: string): Promise<number> {
    await api.post('/login', { email, senha }, { withCredentials: true });
    const res = await api.get<ProtectedResponse>('/protegida', {
      withCredentials: true
    });
    setUser(res.data);
    return res.data.id;
  }

  
  async function logout(): Promise<void> {
    try {
      
      await api.post('/login/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Erro ao deslogar no backend:', err);
    } finally {
      
      setUser(null);
      router.push('/login');
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}