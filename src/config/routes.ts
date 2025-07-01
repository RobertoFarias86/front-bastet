export default {
    'root': '#', 
    'criar-usuario': () => '/usuarios', 
    'login': () => '/login', 
    'listar-cursos': ( filtro ?: any ) => '/cursos' + filtro ? '?' + new URLSearchParams(filtro).toString() : '', 
    'inscrever-curso': ( idCurso : string ) => `/cursos/${ idCurso }`, 
    'cancelar-curso': ( idCurso : string ) => `/cursos/${ idCurso }`, 
    'meus-cursos': ( idUsuario : string ) => `/${ idUsuario }`, 
}