import axios from 'axios'
import { GET_PROJETO, GET_DETALHARPROJETO, LOGOUT_PROJETO } from '../actionsTypes'
import { alertin } from '../alertas/alerta'

import { pageProjeto } from '../adminViews/adminView'

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
                    descricao: projeto.descricao
                    },
                }
            ).then(response => {
                swal({
                    title: "Cadastrado",
                    text: 'O projeto foi cadastrado com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageProjeto());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro na criação do projeto',
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
                    text: 'Falha em acessar o projeto, tente novamente mais tarde',
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
                                                            descricao: projeto.descricao
                                                        } 
                                                    })
            .then(response => {   
                const projeto = response.data
                swal({
                    title: "Atualizado",
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