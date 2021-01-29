import axios from 'axios'
import { GET_PROJETO, GET_DETALHARPROJETO, LOGOUT_PROJETO } from '../actionsTypes'
import { alertin } from '../alertas/alerta'

import { pageDetalhesProjeto } from '../adminViews/adminView'

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
                dispatch(alertin({open: true,
                    alertTitle: 'Criado',
                    severity: 'success',
                    texto: 'O projeto foi cadastrado com sucesso'}))

            })
            .catch( error => {
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Erro na criação do projeto '}))
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
                    var erro_msg = error.response.data.error; // => the response payload 
                    alert(erro_msg)
                }
                /*dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha no envio, '+erro_msg}))*/
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
                if( error.response ){
                    var erro_msg = error.response.data.error; // => the response payload 
               
                }
                /*dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Falha no envio, '+erro_msg}))*/
            })
    }
}

export const getSaveProjeto = projeto => {
    return {
        type: GET_DETALHARPROJETO,
        payload: projeto
    }
}