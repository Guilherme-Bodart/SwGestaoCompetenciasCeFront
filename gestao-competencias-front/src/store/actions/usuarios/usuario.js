import { LOGIN_USUARIO, LOGOUT_USUARIO } from '../actionsTypes'

import axios from 'axios'

import { alertin } from '../alertas/alerta'
import { pageLogin } from '../pages/page'

export const logout = () => {
    return {
        type: LOGOUT_USUARIO
    }
}

export const autenticarUsuario = usuario => {
    return async (dispatch) => {
        const { email, senha } = usuario
        await axios.post("https://leds-skills.herokuapp.com/auth/authenticate", null,  { params: {
            email,
            senha
          }})
            .then(async response => {
                
                usuario = response.data
                
                await dispatch(armazenaInfoUsuario(usuario))
            })
            .catch(error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                dispatch(alertin({open: true,
                    alertTitle: 'Error',
                    severity: 'error',
                    texto: 'Falha no login, '+erro_msg}))

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


        await axios.post("https://leds-skills.herokuapp.com/auth/register", null, 
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
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha no cadastro, '+erro_msg}))
            })
    }
}

export const enviarEmailReset = email => {

    return async (dispatch) =>  {

        await axios.post("https://leds-skills.herokuapp.com/auth/forgot_password", null, 
                { params: {
                    email
                    }
                }
            )
            .then(response => {
                dispatch(alertin({open: true,
                    alertTitle: 'E-mail enviado',
                    severity: 'success',
                    texto: 'O e-mail de recuperação de senha foi enviado com sucesso'}))
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha no envio, '+erro_msg}))
            })
    }
}

export const recuperarSenha = usuario => {

    return async (dispatch) =>  {
        const { senha, token } = usuario


        await axios.post("https://leds-skills.herokuapp.com/auth/reset_password", null, 
                { params: {
                    senha,
                    token
                    }
                }
            )
            .then(response => {
                
                dispatch(alertin({open: true,
                    alertTitle: 'Senha Alterada',
                    severity: 'success',
                    texto: 'Sua senha foi alterada com sucesso'}))

                dispatch(pageLogin());
                
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha ao resetar a senha, '+erro_msg}))
            })
    }
}