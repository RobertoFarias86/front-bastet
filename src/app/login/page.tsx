'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();                   

  
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    try {
      
      const id = await login(form.email, form.senha);

      
      router.push(`/usuario/${id}`);
    } catch (err: any) {
      
      const mensagem = err?.response?.data?.mensagem || 'Erro ao fazer login';
      setErro(mensagem);
    }
  }

  
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">E-mail</label>
          <input
            type="email"
            required
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            required
            className="w-full border p-2 rounded"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
          />
        </div>

        {erro && <p className="text-red-600">{erro}</p>}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 w-full rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}