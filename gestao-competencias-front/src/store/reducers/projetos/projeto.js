import { GET_PROJETO, GET_DETALHARPROJETO } from '../../actions/actionsTypes'

const initialState = {
    projetos: [],
    nomeProjeto: '',
    projeto_detalhado: {}
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case GET_PROJETO:
        let projetos = []
        projetos = action.payload.projetos;
        return {
            ...state, projetos
        }
    case GET_DETALHARPROJETO:
        let projeto_detalhado = {}
        projeto_detalhado = action.payload.projeto;
        return {
            ...state, projeto_detalhado
        }

   default:
       return state
}
}

export default reducer