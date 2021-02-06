import axios from 'axios'

import { GET_ATIVIDADE, GET_DETALHARATIVIDADE, LOGOUT_ATIVIDADE } from '../actionsTypes'


import { pageAtividade, pageCadastrarAtividade } from '../userViews/userView'

import swal from 'sweetalert';

export const logoutAtividade = () => {
    return  {
        type: LOGOUT_ATIVIDADE
    }
}

export const getAtividades = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/tasks", { params: { token } })
            .then(response => {                
                const atividades = response.data
                dispatch(getSaveAtividades(atividades))
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

export const getAlunoAtividades = () => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/users/"+getState().usuario._id+"/tasks", { params: { token } })
            .then(response => {                
                const atividades = response.data
                dispatch(getSaveAtividades(atividades))
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

export const getSaveAtividades = atividades => {
    return {
        type: GET_ATIVIDADE,
        payload: atividades
    }
}

export const getAtividade = (id_atividade) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token

        await axios.get("https://leds-skills.herokuapp.com/tasks/"+id_atividade, { params: { token } })
            .then(response => {                
                const atividade = response.data
                dispatch(getSaveAtividade(atividade))
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Falha em acessar o atividade, tente novamente mais tarde',
                    icon: "error",
                  });
            })
    }
}

export const getSaveAtividade = atividade => {
    return {
        type: GET_DETALHARATIVIDADE,
        payload: atividade
    }
}

export const editarAtividade = (atividade) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token

        await axios.put("https://leds-skills.herokuapp.com/tasks/"+atividade.id, null, 
                                                    { params: 
                                                        {   
                                                            token,
                                                            titulo: atividade.titulo,
                                                            descricao: atividade.descricao,
                                                            categoria: atividade.categoria,
                                                            subcategoria: atividade.subcategoria,
                                                            dataInicial: atividade.dataInicial,
                                                            dataFinal: atividade.dataFinal
                                                        } 
                                                    })
            .then(response => {   
                const atividade = response.data
                swal({
                    title: "Sucesso",
                    text: 'A atividade foi atualizada com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageAtividade());
                  });                
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Falha ao acessar a atividade, tente novamente mais tarde',
                    icon: "error",
                  });
            })
    }
}

export const cadastrarAtividade = (atividade) => {

    return async (dispatch, getState ) =>  {
        const token = 'Bearer ' + getState().usuario.token

        await axios.post("https://leds-skills.herokuapp.com/tasks", null, 
                { params: {
                    token,
                    titulo: atividade.titulo,
                    descricao: atividade.descricao,
                    projeto: atividade.projeto,
                    categoria: atividade.categoria,
                    subcategoria: atividade.subcategoria,
                    dataInicial: atividade.dataInicial,
                    dataFinal: atividade.dataFinal,
                    },
                }
            ).then(response => {
                swal({
                    title: "Sucesso",
                    text: 'A atividade foi cadastrada com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageAtividade());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro no cadastro da atividade',
                    icon: "error",
                  });
            })
    }
}

export const deletarAtividade = (titulo, id_atividade) => {

    return async (dispatch, getState) => {
        swal({
            title: "Deseja excluir a atividade?",
            text: "Caso confirme a exclução da atividade: "+titulo+", a mesma será retirada do projeto vinculado",
            icon: "warning",
            buttons: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const token = 'Bearer ' + getState().usuario.token

                await axios.delete("https://leds-skills.herokuapp.com/tasks/"+id_atividade, { params: { token } })
                    .then(response => { 
                        swal({
                            title: "Sucesso",
                            text: 'Atividade foi excluída com sucesso',
                            icon: "success",
                        }).then((value) => {
                            dispatch(pageCadastrarAtividade());
                            dispatch(pageAtividade());
                        });
                    })
                    .catch( error => {
                        swal({
                            title: "Error",
                            text: 'Falha ao deletar a atividade, tente novamente mais tarde',
                            icon: "error",
                        });
                    })
            }
        });
    }
}