import { PAGE_CADASTRO_CATEGORIA, PAGE_CADASTRO_PROJETO, 
    PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, PAGE_PROJETO, 
    PAGE_DETALHES_PROJETO, PAGE_USUARIO, PAGE_DASHBOARD, 
    PAGE_EDITAR_PROJETO, LOGOUT_ADMINVIEW, PAGE_EDITAR_SUBCATEGORIA, PAGE_EDITAR_USUARIO,
    PAGE_CADASTRO_ATIVIDADE, PAGE_DETALHES_ATIVIDADE, PAGE_ATIVIDADE,
    PAGE_EDITAR_ATIVIDADE, PAGE_RELATORIO, PAGE_COMPETENCIA
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

export const pageCadastrarAtividade = () => {
    return {
        type: PAGE_CADASTRO_ATIVIDADE
    }
}

export const pageDetalhesAtividade = () => {
    return {
        type: PAGE_DETALHES_ATIVIDADE
    }
}

export const pageEditarAtividade = () => {
    return {
        type: PAGE_EDITAR_ATIVIDADE
    }
}

export const pageAtividade = () => {
    return {
        type: PAGE_ATIVIDADE
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

export const pageDashboard = () => {
    return {
        type: PAGE_DASHBOARD
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