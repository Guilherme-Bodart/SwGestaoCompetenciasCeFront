import { GET_PROJETO } from '../../actions/actionsTypes'

const initialState = {
    projetos: [],
    nomeProjeto: '',
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case GET_PROJETO:
        let projetos = []
        projetos = action.payload.projetos;
        return {
            ...state, projetos
        }

   default:
       return state
}
}

export default reducer