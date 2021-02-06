import { GET_CATEGORIA, GET_SUBCATEGORIA, LOGOUT_CATEGORIA, GET_DETALHARSUBCATEGORIA, GET_DETALHARCATEGORIA } from '../../actions/actionsTypes'

const initialState = {
    categorias: [],
    subcategorias: [],
    nomeCategoria: '',
    nomeSubcategoria: '',
    getSubcategoria: {},
    getCategoria: {}
}

const reducer = (state = initialState, action) => {

switch (action.type) {

    case GET_CATEGORIA:
        let categorias = []
        categorias = action.payload.categorias;
        return {
            ...state, categorias
        }
    
    case GET_DETALHARCATEGORIA:
        let getCategoria = []
        getCategoria = action.payload.categoria;
        return {
            ...state, getCategoria
        }

    case GET_SUBCATEGORIA:
        let subcategorias = []
        subcategorias = action.payload.subcategorias;
        return {
            ...state, subcategorias
        }
    
    case GET_DETALHARSUBCATEGORIA:
        let getSubcategoria = {}
        getSubcategoria = action.payload.subcategoria;
        return {
            ...state, getSubcategoria
        }
    
    case LOGOUT_CATEGORIA:
        return initialState

   
   default:
       return state
}
}

export default reducer