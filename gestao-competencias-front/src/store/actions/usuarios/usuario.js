import { LOGIN_USUARIO, LOGOUT_USUARIO } from '../actionsTypes'

import axios from 'axios'

import { alertin } from '../alertas/alerta'

export const logout = () => {
    return {
        type: LOGOUT_USUARIO
    }
}


export const armazenaInfoUsuario = user => {
    return {
        type: LOGIN_USUARIO,
        payload: user,
    }
}

export const criarUsuario = user => {

    return async (dispatch) =>  {
        const { nome, email, senha, cpf, telefone, endereco, dataNascimento, permissao } = user


        await axios.post("http://localhost:3000/auth/register", null, 
                { params: {
                    nome,
                    email,
                    senha,
                    cpf,
                    telefone,
                    endereco,
                    dataNascimento,
                    permissao
                    }
                }
            )
            .then(response => {
                dispatch(alertin({open: true,
                    alertTitle: 'Cadastrado',
                    severity: 'success',
                    texto: 'Usuário cadastrado com sucesso'}))
            })
            .catch(req => {
                dispatch(alertin({open: true,
                    alertTitle: 'Desconhecido',
                    severity: 'warning',
                    texto: 'Falha no cadastro, tente novamente mais tarde'}))
            })
    }
}