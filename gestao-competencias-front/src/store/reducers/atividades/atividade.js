import { GET_ATIVIDADE, GET_DETALHARATIVIDADE, LOGOUT_ATIVIDADE } from '../../actions/actionsTypes'

const initialState = {
    atividades: [],
    atividade_detalhado: {}
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case GET_ATIVIDADE:
        let atividades = []
        atividades = action.payload.atividades;
        return {
            ...state, atividades
        }
    case GET_DETALHARATIVIDADE:
        let atividade_detalhado = {}
        atividade_detalhado = action.payload.atividade;
        return {
            ...state, atividade_detalhado
        }
    
    case LOGOUT_ATIVIDADE:
        return initialState
    
   default:
       return state
}
}

export default reducer