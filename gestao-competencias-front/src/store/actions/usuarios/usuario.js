import { LOGIN_USUARIO, LOGOUT_USUARIO } from '../actionsTypes'

import axios from 'axios'

import { alertin } from '../alertas/alerta'

export const logout = () => {
    return {
        type: LOGOUT_USUARIO
    }
}



export const autenticarUsuario = usuario => {
    return (dispatch) => {
        const { email, senha } = usuario
        axios.post("http://localhost:3000/auth/authenticate", null,  { params: {
            email,
            senha
          }})
            .then(response => {
                
                usuario = response.data
                
                dispatch(armazenaInfoUsuario(usuario))
            })
            .catch(error => {
                dispatch(alertin({open: true,
                    alertTitle: 'Desconhecido',
                    severity: 'warning',
                    texto: 'Falha no login, tente novamente mais tarde'}))
            })
    }
}


export const armazenaInfoUsuario = usuario => {
    return {
        type: LOGIN_USUARIO,
        payload: usuario,
    }
}

export const criarUsuario = usuario => {

    return async (dispatch) =>  {
        const { nome, email, senha, cpf, telefone, endereco, dataNascimento, permissao } = usuario


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