import { PAGE_CADASTRO_CATEGORIA, PAGE_CADASTRO_PROJETO, 
    PAGE_CADASTRO_SUBCATEGORIA, PAGE_SUBCATEGORIA, PAGE_PROJETO } from '../actionsTypes'


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

export const pageProjeto = () => {
    return {
        type: PAGE_PROJETO
    }
}