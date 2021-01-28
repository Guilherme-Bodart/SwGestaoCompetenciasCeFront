import { GET_CATEGORIA, GET_SUBCATEGORIA } from '../../actions/actionsTypes'

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
        let { subcategorias } = action.payload.subcategoria;
        return {
            ...state, subcategorias
        }
   
   default:
       return state
}
}

export default reducer