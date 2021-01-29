import { GET_CATEGORIA, GET_SUBCATEGORIA, LOGOUT_CATEGORIA } from '../../actions/actionsTypes'

const initialState = {
    categorias: [],
    subcategorias: [],
    nomeCategoria: '',
    nomeSubcategoria: '',
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case GET_CATEGORIA:
        let categorias = []
        categorias = action.payload.categorias;
        return {
            ...state, categorias
        }

   case GET_SUBCATEGORIA:
        let subcategorias = []
        subcategorias = action.payload.subcategorias;
        return {
            ...state, subcategorias
        }
    case LOGOUT_CATEGORIA:
        return initialState

   
   default:
       return state
}
}

export default reducer