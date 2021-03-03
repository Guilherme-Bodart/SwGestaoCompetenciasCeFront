import axios from 'axios'
import { GET_PROJETO, GET_DETALHARPROJETO, LOGOUT_PROJETO } from '../actionsTypes'

import { pageProjeto, pageEditarProjeto } from '../adminViews/adminView'

import swal from 'sweetalert';

export const logoutProjeto = () => {
    return  {
        type: LOGOUT_PROJETO
    }
}

export const criarProjeto = (projeto) => {

    return async (dispatch, getState ) =>  {
        const token = 'Bearer ' + getState().usuario.token

        await axios.post("https://leds-skills.herokuapp.com/projects", null, 
                { params: {
                    token,
                    nome: projeto.nome,
                    equipe: projeto.equipe,
                    descricao: projeto.descricao,
                    entregas: projeto.entregas
                    },
                }
            ).then(response => {
                swal({
                    title: "Sucesso",
                    text: 'O projeto foi cadastrado com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageProjeto());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro no cadastro do projeto',
                    icon: "error",
                  });
            })
    }
}

export const getProjetos = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/projects", { params: { token } })
            .then(response => {                
                const projetos = response.data
                dispatch(getSaveProjetos(projetos))
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

export const getAlunoProjetos = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/users/"+getState().usuario._id+"/projects", { params: { token } })
            .then(response => {                
                const projetos = response.data
                dispatch(getSaveProjetos(projetos))
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

export const getSaveProjetos = projetos => {
    return {
        type: GET_PROJETO,
        payload: projetos
    }
}

export const getProjeto = (id_projeto) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token

        await axios.get("https://leds-skills.herokuapp.com/projects/"+id_projeto, { params: { token } })
            .then(response => {                
                const projeto = response.data
                dispatch(getSaveProjeto(projeto))
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Falha ao acessar o projeto, tente novamente mais tarde',
                    icon: "error",
                  });
            })
    }
}

export const atualizarProjeto = (projeto,id_projeto) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.put("https://leds-skills.herokuapp.com/projects/"+id_projeto, null, 
                                                    { params: 
                                                        {   
                                                            token,
                                                            nome: projeto.nome,
                                                            equipe: projeto.equipe,
                                                            descricao: projeto.descricao,
                                                            entregas: projeto.entregas
                                                        } 
                                                    })
            .then(response => {   
                swal({
                    title: "Sucesso",
                    text: 'O projeto foi atualizado com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageProjeto());
                  });                
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Falha em acessar o projeto, tente novamente mais tarde',
                    icon: "error",
                  });
            })
    }
}


export const getSaveProjeto = projeto => {
    return {
        type: GET_DETALHARPROJETO,
        payload: projeto
    }
}

export const desativarProjeto = (nome, id_projeto) => {
    return async (dispatch, getState) => {
        swal({
            title: "Deseja desativar o projeto?",
            text: "Caso desative o projeto: "+nome+", os usuários vinculados a ele não teram mais acesso",
            icon: "warning",
            buttons: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const token = 'Bearer ' + getState().usuario.token

                await axios.delete("https://leds-skills.herokuapp.com/projects/"+id_projeto, { params: { token } })
                    .then(response => { 
                        swal({
                            title: "Sucesso",
                            text: 'Projeto foi desativado com sucesso',
                            icon: "success",
                        }).then((value) => {
                            dispatch(pageEditarProjeto());
                            dispatch(pageProjeto());
                        });
                    })
                    .catch( error => {
                        swal({
                            title: "Error",
                            text: 'Falha em desativar o projeto, tente novamente mais tarde',
                            icon: "error",
                        });
                    })
            }
        });
    }
}