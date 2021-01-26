import { PAGE_CADASTRO, PAGE_LOGIN, PAGE_RECUPERAR, PAGE_ENVIAREMAIL } from '../actionsTypes'

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

export const pageEnviarEmail = () => {
    return {
        type: PAGE_ENVIAREMAIL
    }
}

export const pageLogin = () => {
    return {
        type: PAGE_LOGIN
    }
}