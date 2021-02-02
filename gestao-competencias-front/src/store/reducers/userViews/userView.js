import { PAGE_CADASTRO_CATEGORIA,PAGE_CADASTRO_PROJETO, 
    PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, 
    PAGE_PROJETO, PAGE_DETALHES_PROJETO, PAGE_USUARIO,
    PAGE_DASHBOARD, PAGE_EDITAR_PROJETO, LOGOUT_ADMINVIEW, PAGE_EDITAR_SUBCATEGORIA,
    PAGE_EDITAR_USUARIO, PAGE_CADASTRO_ATIVIDADE, PAGE_DETALHES_ATIVIDADE, PAGE_ATIVIDADE,
    PAGE_EDITAR_ATIVIDADE
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
    

case PAGE_CADASTRO_ATIVIDADE:
    var page = 'cadastroAtividade'

    return {
        ...state, page
    }

case PAGE_DETALHES_ATIVIDADE:
    var page = 'detalhesAtividade'

    return {
        ...state, page
    }

case PAGE_ATIVIDADE:
    page = 'atividade'
    return {
        ...state, page
    }

case PAGE_EDITAR_ATIVIDADE:
    page = 'editaratividade'
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

case LOGOUT_ADMINVIEW:
    return initialState


   
default:
   return state
}
}

export default reducer