import { LOGIN_USUARIO, LOGOUT_USUARIO, GET_USUARIOS, GET_USUARIO } from '../actionsTypes'

import axios from 'axios'

import { alertin, alertout } from '../alertas/alerta'
import { pageLogin } from '../pages/page'

import { pageUsuario } from '../adminViews/adminView'

export const logout = () => {
    return  {
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
                dispatch(alertout())
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

export const getUsuarios = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/users", { params: { token } })
            .then(response => {                
                const usuarios = response.data
                dispatch(getSaveUsuario(usuarios))
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error;
                }dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha no envio, '+erro_msg}))
            })
    }
}

export const getSaveUsuario = usuarios => {
    return {
        type: GET_USUARIOS,
        payload: usuarios
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
                dispatch(pageLogin());
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

export const getUsuario = (id_usuario) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/users/"+id_usuario, { params: { token } })
            .then(response => {                
                const usuarios = response.data
                dispatch(getSaveDetalharUsuario(usuarios))
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error;
                }
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha no envio, '+erro_msg}))
            })
    }
}

export const getSaveDetalharUsuario = usuario => {
    return {
        type: GET_USUARIO,
        payload: usuario
    }
}

export const editarUsuario = usuario => {

    return async (dispatch) =>  {

        await axios.put("https://leds-skills.herokuapp.com/users/"+usuario.id, null, 
                { params: {
                    nome: usuario.nome,
                    email: usuario.email,
                    cpf: usuario.cpf,
                    telefone: usuario.telefone,
                    endereco: usuario.endereco,
                    dataNascimento: usuario.dataNascimento,
                    permissao: usuario.permissao
                    }
                }
            )
            .then(response => {
                dispatch(alertin({open: true,
                    alertTitle: 'Editado',
                    severity: 'success',
                    texto: 'Usuário editado com sucesso'}))
                dispatch(pageUsuario());
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha na edição, '+erro_msg}))
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
                    alertTitle: 'Enviado',
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
                    alertTitle: 'Alterada',
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