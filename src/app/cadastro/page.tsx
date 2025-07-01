'use client'

import { useState } from 'react'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function CadastroPage() {
  const router = useRouter()
  const { login } = useAuth()       
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    nascimento: '',
  })
  const [erro, setErro] = useState('')

  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    try {
      
      await api.post('/usuarios', form, { withCredentials: true })

      
      await login(form.email, form.senha)

      
      router.push('/') 
    } catch (err: any) {
      const msg = err?.response?.data?.mensagem || 'Erro ao cadastrar'
      setErro(msg)
    }
  }

  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Cadastro de Aluno</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nascimento"
          placeholder="Data de nascimento (dd/mm/aaaa)"
          value={form.nascimento}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-indigo-700 text-white py-2 rounded hover:bg-indigo-900"
        >
          Cadastrar
        </button>

        {erro && <p className="text-red-600">{erro}</p>}
      </form>
    </div>
  )
}