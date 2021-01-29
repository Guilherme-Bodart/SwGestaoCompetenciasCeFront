import { PAGE_CADASTRO_CATEGORIA, PAGE_CADASTRO_PROJETO, 
    PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, PAGE_PROJETO, 
    PAGE_DETALHES_PROJETO, PAGE_USUARIO, PAGE_DASHBOARD, 
    PAGE_EDITAR_PROJETO, LOGOUT_ADMINVIEW
} from '../actionsTypes'

export const logoutAdminview = () => {
    return  {
        type: LOGOUT_ADMINVIEW
    }
}

export const pageCadastrarCategoria = () => {
    return {
        type: PAGE_CADASTRO_CATEGORIA
    }
}

export const pageCadastrarSubCategoria = () => {
    return {
        type: PAGE_CADASTRO_SUBCATEGORIA
    }
}

export const pageSubCategoria = () => {
    return {
        type: PAGE_SUBCATEGORIA
    }
}

export const pageCadastrarProjeto = () => {
    return {
        type: PAGE_CADASTRO_PROJETO
    }
}

export const pageDetalhesProjeto = () => {
    return {
        type: PAGE_DETALHES_PROJETO
    }
}

export const pageEditarProjeto = () => {
    return {
        type: PAGE_EDITAR_PROJETO
    }
}

export const pageProjeto = () => {
    return {
        type: PAGE_PROJETO
    }
}

export const pageUsuario = () => {
    return {
        type: PAGE_USUARIO
    }
}

export const pageDashboard = () => {
    return {
        type: PAGE_DASHBOARD
    }
}