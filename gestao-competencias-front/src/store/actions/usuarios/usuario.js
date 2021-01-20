import { LOGIN_USUARIO, LOGOUT_USUARIO } from '../actionsTypes'

import axios from 'axios'


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

    return (dispatch) => {
        const { nome, email, senha, cpf, telefone, endereco, dataNascimento, permissao } = user
        var postData = { nome, email, senha, cpf, telefone, endereco, dataNascimento, permissao }
        
        axios.post("http://localhost:3000/auth/register",JSON.stringify(postData))
            .then(response => {

                alert("response")
            })
            .catch(req => {
                alert("Não foi possivel criar a conta")
            })

        // axios.post("http://localhost:3000/auth/register", null,  { params: {
        //     nome,
        //     email,
        //     senha,
        //     cpf,
        //     telefone,
        //     endereco,
        //     dataNascimento,
        //     permissao
        //   }})
        //     .then(response => {

        //         alert("response")
        //     })
        //     .catch(req => {
        //         alert("Não foi possivel criar a conta")
        //     })
    }
}