export interface Curso {
  id: number;
  nome: string;
  descricao: string;
  capa: string;
  inscricoes: number;
  inicio: string;
  inscricao_cancelada: boolean;
  inscrito: boolean;
}