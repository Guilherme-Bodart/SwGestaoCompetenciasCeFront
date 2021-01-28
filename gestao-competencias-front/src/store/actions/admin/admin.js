import axios from 'axios'

import { alertin } from '../alertas/alerta'
import { pageCadastrarSubCategoria } from '../adminView/adminView'

export const criarCategoria = nome => {

    return async (dispatch) =>  {
        alert(nome)
        await axios.post("http://localhost:3000/category", null, 
                { params: {
                    nome
                    },
                    headers: { 
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTA2YTdlODllMGM2MTk1OGM0YjEzNCIsImlhdCI6MTYxMTc4NTI4OCwiZXhwIjoxNjExODcxNjg4fQ.NveiNfAQwlsB2lLkGhdwwwSSxUrzInuXKhBOBnhDedw', 
                        'Content-Type': 'application/json'
                      },
                }
            ).then(response => {
                alert('cadastrado')
                /*dispatch(alertin({open: true,
                    alertTitle: 'Categoria cadastrada',
                    severity: 'success',
                    texto: 'A categoria foi cadastrada com sucesso'}))*/

            })
            .catch( error => {
                alert(JSON.stringify(error))
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