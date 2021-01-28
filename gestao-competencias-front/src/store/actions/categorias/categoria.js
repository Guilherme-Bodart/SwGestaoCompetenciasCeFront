import axios from 'axios'
import { GET_CATEGORIA } from '../actionsTypes'
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

export const getCategorias = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        const nome = 'dasd'
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

export const getSaveCategorias = projeto => {
    return {
        type: GET_CATEGORIA,
        payload: projeto
    }
}
