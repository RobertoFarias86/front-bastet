'use client'

import CursoView from '@/components/curso/view'
import { useEffect, useState } from 'react'
import api from '@/services/api'
import type { Curso } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

export default function Page() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [carregando, setCarregando] = useState(true)
  const { user } = useAuth()

  
  async function fetchCursos() {
  try {
    const res = await api.get<Curso[]>('/cursos') 
    console.log('Cursos recebidos da API:', res.data) 
    setCursos(res.data)
  } catch (err) {
    console.error('Erro ao carregar cursos:', err)
  } finally {
    setCarregando(false)
  }
}

  
  async function verificarAutenticacao() {
    const token = localStorage.getItem('token') 

    if (!token) {
      console.warn('⚠️ Token não encontrado no localStorage.')
      return
    }

    try {
      const res = await api.get('/protegida', {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })

      console.log('✅ Usuário autenticado:', res.data)
    } catch (err: any) {
      console.error('❌ Erro ao acessar /protegida:', err?.response?.data || err.message)
    }
  }

  
  useEffect(() => {
    fetchCursos()
    verificarAutenticacao() 
  }, [])

  return (
    <main>
      <h2 className="page-title">Cursos</h2>

      {carregando ? (
        <p>Carregando cursos...</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <CursoView
              data={curso}
              key={curso.id}
              onStatusChange={fetchCursos}
            />
          ))}
        </div>
      )}
    </main>
  )
}