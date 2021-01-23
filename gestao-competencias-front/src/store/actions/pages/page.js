import { PAGE_CADASTRO, PAGE_LOGIN, PAGE_RECUPERAR } from '../actionsTypes'

export const pageCadastrar = () => {
    return {
        type: PAGE_CADASTRO
    }
}

export const pageRecuperar = () => {
    return {
        type: PAGE_RECUPERAR
    }
}

export const pageLogin = () => {
    return {
        type: PAGE_LOGIN
    }
}