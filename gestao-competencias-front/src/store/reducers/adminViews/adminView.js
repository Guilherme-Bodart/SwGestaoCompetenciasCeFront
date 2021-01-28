import { PAGE_CADASTRO_CATEGORIA,PAGE_CADASTRO_PROJETO, 
        PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, PAGE_PROJETO
} from '../../actions/actionsTypes'

const initialState = {
    page: 'projeto',
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case PAGE_CADASTRO_CATEGORIA:
       var page = 'cadastroCategoria'

       return {
           ...state, page
       }

    case PAGE_CADASTRO_SUBCATEGORIA:
        var page = 'cadastroSubcategoria'

        return {
            ...state, page
        }

    case PAGE_SUBCATEGORIA:
        page = 'subcategoria'
        return {
            ...state, page
        }

    case PAGE_CADASTRO_PROJETO:
        var page = 'cadastroProjeto'
 
        return {
            ...state, page
        }

   case PAGE_PROJETO:
        page = 'projeto'
        return {
            ...state, page
        }
       
   default:
       return state
}
}

export default reducer