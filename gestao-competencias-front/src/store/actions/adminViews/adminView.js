import { PAGE_CADASTRO_CATEGORIA, PAGE_CADASTRO_PROJETO, 
    PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, PAGE_PROJETO, 
    PAGE_DETALHES_PROJETO, PAGE_USUARIO, PAGE_DASHBOARD, 
    PAGE_EDITAR_PROJETO, LOGOUT_ADMINVIEW, PAGE_EDITAR_SUBCATEGORIA, PAGE_EDITAR_USUARIO,
    PAGE_DETALHAR_USUARIO, PAGE_CATEGORIA, PAGE_EDITAR_CATEGORIA, PAGE_COMPETENCIA, PAGE_RELATORIO,
    PAGE_CADASTRAR_COMPETENCIA
} from '../actionsTypes'

export const logoutAdminview = () => {
    return  {
        type: LOGOUT_ADMINVIEW
    }
}

export const pageCategoria = () => {
    return {
        type: PAGE_CATEGORIA
    }
}

export const pageEditarCategoria = () => {
    return {
        type: PAGE_EDITAR_CATEGORIA
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

export const pageEditarSubCategoria = () => {
    return {
        type: PAGE_EDITAR_SUBCATEGORIA
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

export const pageEditarUsuario = () => {
    return {
        type: PAGE_EDITAR_USUARIO
    }
}

export const pageDetalharUsuario = () => {
    return {
        type: PAGE_DETALHAR_USUARIO
    }
}

export const pageCompetencia = () => {
    return {
        type: PAGE_COMPETENCIA
    }
}

export const pageRelatorio = () => {
    return {
        type: PAGE_RELATORIO
    }
}

export const pageDashboard = () => {
    return {
        type: PAGE_DASHBOARD
    }
}

export const pageCadastrarCompetencia = () => {
    return {
        type: PAGE_CADASTRAR_COMPETENCIA
    }
}