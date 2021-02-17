import { LOGIN_USUARIO, LOGOUT_USUARIO, GET_USUARIOS, GET_USUARIO } from '../actionsTypes'

import axios from 'axios'

import { pageLogin } from '../pages/page'

import { pageEditarUsuario, pageUsuario } from '../adminViews/adminView'

import swal from 'sweetalert';

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
            })
            .catch(error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                swal({
                    title: "Error",
                    text: 'Falha no login, '+erro_msg,
                    icon: "error",
                  });

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
                }
                swal({
                    title: "Error",
                    text: 'Falha no envio, '+erro_msg,
                    icon: "error",
                  });
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
                 swal({
                    title: "Sucesso",
                    text: 'Usuário cadastrado com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageLogin());
                  });
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                swal({
                    title: "Error",
                    text: 'Falha no cadastro, '+erro_msg,
                    icon: "error",
                  });
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
                swal({
                    title: "Error",
                    text: 'Falha no envio, '+erro_msg,
                    icon: "error",
                  });
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

    return async (dispatch, getState) => {

        const token = 'Bearer ' + getState().usuario.token
        await axios.put("https://leds-skills.herokuapp.com/users/"+usuario.id, null, 
                { params: {
                    token,
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
                swal({
                    title: "Sucesso",
                    text: 'Usuário atualizado com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageUsuario());
                  });
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                swal({
                    title: "Error",
                    text: 'Falha na edição, '+erro_msg,
                    icon: "error",
                  })
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
                swal({
                    title: "Sucesso",
                    text: 'O e-mail de recuperação de senha foi enviado com sucesso',
                    icon: "success",
                  })
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                swal({
                    title: "Error",
                    text: 'Falha no envio, '+erro_msg,
                    icon: "error",
                  })
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

                swal({
                    title: "Sucesso",
                    text: 'Sua senha foi alterada com sucesso',
                    icon: "success",
                }).then((value) => {
                    dispatch(pageLogin());
                });          
            })
            .catch( error => {
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
                }
                swal({
                    title: "Error",
                    text: 'Falha ao resetar a senha, '+erro_msg,
                    icon: "error",
                  })
            })
    }
}

export const desativarUsuario = (nome, id_user) => {
    return async (dispatch, getState) => {
        swal({
            title: "Deseja desativar o usuário?",
            text: "Caso confirme desativar o usuário: "+nome+", o mesmo será retirado dos projetos vinculados",
            icon: "warning",
            buttons: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const token = 'Bearer ' + getState().usuario.token

                await axios.delete("https://leds-skills.herokuapp.com/users/"+id_user, { params: { token } })
                    .then(response => { 
                        swal({
                            title: "Sucesso",
                            text: 'Usuário foi desativado com sucesso',
                            icon: "success",
                        }).then((value) => {
                            dispatch(pageEditarUsuario());
                            dispatch(pageUsuario());
                        });
                    })
                    .catch( error => {
                        swal({
                            title: "Error",
                            text: 'Falha em desativar o usuário',
                            icon: "error",
                        });
                    })
            }
        });
    }
}