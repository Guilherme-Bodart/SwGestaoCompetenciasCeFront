import axios from 'axios'
import { GET_CATEGORIA, GET_SUBCATEGORIA } from '../actionsTypes'
import { alertin } from '../alertas/alerta'

export const criarCategoria = (nome) => {

    return async (dispatch, getState ) =>  {
        const token = 'Bearer ' + getState().usuario.token
        await axios.post("https://leds-skills.herokuapp.com/category", null, 
                { params: {
                    token,
                    nome
                    },
                }
            ).then(response => {
                
                dispatch(alertin({open: true,
                    alertTitle: 'Criado',
                    severity: 'success',
                    texto: 'A categoria foi cadastrada com sucesso'}))

            })
            .catch( error => {
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Erro na criação da categoria '}))
            })
        
    }
}

export const getCategorias = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/category", { params: { token } })
            .then(response => {                
                const categorias = response.data
                dispatch(getSaveCategorias(categorias))
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

export const getSaveCategorias = categoria => {
    return {
        type: GET_CATEGORIA,
        payload: categoria
    }
}

export const criarSubCategoria = (subcategoria) => {

    return async (dispatch, getState ) =>  {

        const token = 'Bearer ' + getState().usuario.token
        await axios.post("https://leds-skills.herokuapp.com/subcategory", null, 
                { params: {
                    token,
                    nome: subcategoria.nome,
                    categoria: subcategoria.categoria
                    },
                }
            ).then(response => {
                
                dispatch(alertin({open: true,
                    alertTitle: 'Criado',
                    severity: 'success',
                    texto: 'A subcategoria foi cadastrada com sucesso'}))

            })
            .catch( error => {
                dispatch(alertin({open: true,
                    alertTitle: 'Erro',
                    severity: 'error',
                    texto: 'Erro na criação da subcategoria '}))
            })
        
    }
}


export const getSubCategorias = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/subcategory", { params: { token } })
            .then(response => {                
                const subcategorias = response.data
                dispatch(getSaveSubCategorias(subcategorias))
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


export const getSaveSubCategorias = subcategoria => {
    return {
        type: GET_SUBCATEGORIA,
        payload: subcategoria
    }
}
