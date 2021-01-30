import { PAGE_CADASTRO_CATEGORIA,PAGE_CADASTRO_PROJETO, 
        PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, 
        PAGE_PROJETO, PAGE_DETALHES_PROJETO, PAGE_USUARIO,
        PAGE_DASHBOARD, PAGE_EDITAR_PROJETO, LOGOUT_ADMINVIEW
} from '../../actions/actionsTypes'

const initialState = {
    page: 'dashboard',
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
    
    case PAGE_DETALHES_PROJETO:
        var page = 'detalhesProjeto'
 
        return {
            ...state, page
        }

    case PAGE_PROJETO:
        page = 'projeto'
        return {
            ...state, page
        }

    case PAGE_EDITAR_PROJETO:
        page = 'editarProjeto'
        return {
            ...state, page
        }
        
    
    case PAGE_USUARIO:
        page = 'usuario'
        return {
            ...state, page
        }

    case PAGE_DASHBOARD:
        page = 'dashboard'
        return {
            ...state, page
        }

    case LOGOUT_ADMINVIEW:
        return initialState
    
    
       
   default:
       return state
}
}

export default reducer