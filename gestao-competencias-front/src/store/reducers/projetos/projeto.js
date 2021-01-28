import { GET_PROJETO } from '../../actions/actionsTypes'

const initialState = {
    projetos: [],
    nomeProjeto: '',
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case GET_PROJETO:
        let categorias = []
        categorias = action.payload.categorias;
        return {
            ...state, categorias
        }

   default:
       return state
}
}

export default reducer