'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import api from '@/services/api'
import type { Curso } from '@/types'

export default function MeusCursosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { idUsuario } = useParams()             
  const idURL = Number(idUsuario)

  const [cursos, setCursos] = useState<Curso[]>([])
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(true)

  
  async function carregarCursos() {
    try {
      const { data } = await api.get<Curso[]>(`/usuarios/${idURL}/cursos`)
      setCursos(data)
    } catch {
      setErro('Erro ao buscar cursos')
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    if (user === null) return 

    if (!user) {
      router.push('/login')
      return
    }

    if (user.id !== idURL) {
      setErro('Acesso negado. Você não pode acessar cursos de outro usuário.')
      setLoading(false)
      return
    }

    carregarCursos()
  }, [user, idURL, router])

  
  async function cancelarInscricao(idCurso: number) {
    try {
      await api.delete(`/cursos/${idCurso}/inscricao`, {
        withCredentials: true,
      })
      await carregarCursos()
    } catch {
      alert('Erro ao cancelar inscrição.')
    }
  }

  
  if (loading) return <p>Carregando cursos...</p>
  if (erro) return <p className="text-red-600">{erro}</p>

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Meus Cursos</h2>

      {cursos.length === 0 ? (
        <p>Você ainda não está inscrito em nenhum curso.</p>
      ) : (
        <ul className="space-y-4">
          {cursos.map((curso) => (
            <li key={curso.id} className="border rounded p-4 shadow-sm">
              <h3 className="text-xl font-bold text-indigo-700">{curso.nome}</h3>
              <p>{curso.descricao}</p>
              <p>
                <strong>Início:</strong>{' '}
                {new Date(curso.inicio).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <strong>Inscritos:</strong> {curso.inscricoes}
              </p>

              <p
                className={
                  curso.inscricao_cancelada ? 'text-red-600' : 'text-green-700'
                }
              >
                {curso.inscricao_cancelada
                  ? 'Inscrição Cancelada'
                  : 'Inscrição Ativa'}
              </p>

              {}
              {!curso.inscricao_cancelada && (
                <button
                  onClick={() => cancelarInscricao(curso.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancelar inscrição
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}