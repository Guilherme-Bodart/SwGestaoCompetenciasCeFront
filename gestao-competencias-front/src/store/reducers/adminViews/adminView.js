import { PAGE_CADASTRO_CATEGORIA,PAGE_CADASTRO_PROJETO, 
        PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, 
        PAGE_PROJETO, PAGE_DETALHES_PROJETO, PAGE_USUARIO,
        PAGE_DASHBOARD, PAGE_EDITAR_PROJETO, LOGOUT_ADMINVIEW, PAGE_EDITAR_SUBCATEGORIA,
        PAGE_EDITAR_USUARIO, PAGE_DETALHAR_USUARIO, PAGE_EDITAR_CATEGORIA, PAGE_CATEGORIA, 
        PAGE_RELATORIO, PAGE_COMPETENCIA, PAGE_CADASTRAR_COMPETENCIA
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
        page = 'cadastroSubcategoria'

        return {
            ...state, page
        }

    case PAGE_SUBCATEGORIA:
        page = 'subcategoria'
        return {
            ...state, page
        }

    case PAGE_CADASTRO_PROJETO:
        page = 'cadastroProjeto'
 
        return {
            ...state, page
        }
    
    case PAGE_DETALHES_PROJETO:
        page = 'detalhesProjeto'
 
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
    
    case PAGE_EDITAR_USUARIO:
        page = 'editarUsuario'
        return {
            ...state, page
        }
    
    case PAGE_DETALHAR_USUARIO:
        page = 'detalhesUsuario'
        return {
            ...state, page
        }
    
    case PAGE_EDITAR_CATEGORIA:
        page = 'editarCategoria'
        return {
            ...state, page
        }

    case PAGE_CATEGORIA:
        page = 'categoria'
        return {
            ...state, page
        }
    

    case PAGE_DASHBOARD:
        page = 'dashboard'
        return {
            ...state, page
        }
    
    case PAGE_EDITAR_SUBCATEGORIA:
        page = 'editarSubCategoria'
        return {
            ...state, page
        }

    case PAGE_RELATORIO:
        page = 'relatorio'
        return {
            ...state, page
        }

    case PAGE_COMPETENCIA:
        page = 'competencia'
        return {
            ...state, page
        }

    case PAGE_CADASTRAR_COMPETENCIA:
        var page = 'cadastrarCompetencia'
    
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