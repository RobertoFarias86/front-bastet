'use client'

import type { Curso } from '@/types'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/services/api'

interface Props {
  data: Curso
  onStatusChange?: () => void 
}

export default function CursoView({ data, onStatusChange }: Props) {
  const { user } = useAuth()

  
  async function inscrever() {
    if (!user) return
    try {
      await api.post(`/cursos/${data.id}/inscricao`, {}, { withCredentials: true })
      onStatusChange?.()
    } catch (err) {
      console.error('Erro ao se inscrever:', err)
    }
  }

  
  async function cancelar() {
    if (!user) return
    try {
      await api.delete(`/cursos/${data.id}/inscricao`, { withCredentials: true })
      onStatusChange?.()
    } catch (err) {
      console.error('Erro ao cancelar inscrição:', err)
    }
  }

  return (
    <div className="border flex-1 flex flex-col">
      {}
      <figure className="relative aspect-video">
        <Image src={data.capa} alt={data.nome} fill className="object-cover" />
        {data.inscrito && (
          <figcaption className="text-sm p-2 bg-white text-black absolute top-4 left-4 border border-slate-400 rounded-xl shadow">
            {data.inscricao_cancelada
              ? 'Inscrição cancelada'
              : 'Você está inscrito'}
          </figcaption>
        )}
      </figure>

      {}
      <div className="p-6 flex flex-col gap-2 flex-1">
        <h3 className="text-2xl">{data.nome}</h3>
        <p>{data.descricao}</p>
        <div className="flex flex-row flex-wrap gap-1">
          <span className="text-xs py-1 px-2 bg-slate-200 rounded-2xl">
            {data.inscricoes} inscritos
          </span>
          <span className="text-xs py-1 px-2 bg-slate-200 rounded-2xl">
            Início: {new Date(data.inicio).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>

      {}
      {user && (
        <div className="p-4">
          {data.inscrito ? (
            data.inscricao_cancelada ? (
              <p className="text-center text-red-600 font-semibold">
                Inscrição cancelada
              </p>
            ) : (
              <button
                onClick={cancelar}
                className="w-full bg-slate-300 hover:bg-slate-400 py-2 rounded"
              >
                Cancelar inscrição
              </button>
            )
          ) : (
            <button
              onClick={inscrever}
              disabled={data.inscricao_cancelada} 
              className={`w-full py-2 rounded ${
                data.inscricao_cancelada
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              {data.inscricao_cancelada ? 'Inscrição indisponível' : 'Fazer inscrição'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}