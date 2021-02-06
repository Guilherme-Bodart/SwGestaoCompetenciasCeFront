import axios from 'axios'
import { GET_CATEGORIA, GET_SUBCATEGORIA, LOGOUT_CATEGORIA, GET_DETALHARSUBCATEGORIA, GET_DETALHARCATEGORIA } from '../actionsTypes'

import { pageSubCategoria, pageCadastrarSubCategoria, pageEditarSubCategoria, pageCategoria, pageEditarCategoria } from '../adminViews/adminView'

import swal from 'sweetalert';

export const logoutCategoria = () => {
    return  {
        type: LOGOUT_CATEGORIA
    }
}

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
                swal({
                    title: "Cadastrada",
                    text: 'A categoria foi cadastrada com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageCategoria());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro na criação da categoria',
                    icon: "error",
                  });
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

export const getSaveCategorias = categoria => {
    return {
        type: GET_CATEGORIA,
        payload: categoria
    }
}

export const getCategoria = (id_categoria) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/category/"+id_categoria, { params: { token } })
            .then(response => {                
                const categoria = response.data
                dispatch(getSaveCategoria(categoria))
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

export const getSaveCategoria = categoria => {
    return {
        type: GET_DETALHARCATEGORIA,
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
                swal({
                    title: "Cadastrada",
                    text: 'A subcategoria foi cadastrada com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageSubCategoria());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro na criação da subcategoria',
                    icon: "error",
                  });
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

export const getSubCategoriasExp = (id_categoria) => {
    return async (dispatch, getState) => {
        const token = 'Bearer ' + getState().usuario.token

        await axios.get("https://leds-skills.herokuapp.com/category/"+id_categoria+"/subcategory", { params: { token } })
            .then(response => {                
                const subcategorias = response.data
                dispatch(getSaveSubCategorias(subcategorias))
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

export const getSaveSubCategorias = subcategoria => {
    return {
        type: GET_SUBCATEGORIA,
        payload: subcategoria
    }
}

export const getSubCategoria = (id_subcategoria) => {
    return async (dispatch, getState) => {

        const token = 'Bearer ' + getState().usuario.token
        await axios.get("https://leds-skills.herokuapp.com/subcategory/"+id_subcategoria, { params: { token } })
            .then(response => {                
                const subcategoria = response.data
                dispatch(getSaveSubCategoria(subcategoria))
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

export const getSaveSubCategoria = subcategoria => {
    return {
        type: GET_DETALHARSUBCATEGORIA,
        payload: subcategoria
    }
}

export const editarSubCategoria = (subcategoria) => {

    return async (dispatch, getState ) =>  {

        const token = 'Bearer ' + getState().usuario.token
        await axios.put("https://leds-skills.herokuapp.com/subcategory/"+subcategoria.id, null, 
                { params: {
                    token,
                    nome: subcategoria.nome,
                    categoria: subcategoria.categoria
                    },
                }
            ).then(response => {
                swal({
                    title: "Atualizada",
                    text: 'A subcategoria foi atualizada com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageSubCategoria());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro na edição da subcategoria',
                    icon: "error",
                  });
            })
        
    }
}

export const editarCategoria = (categoria) => {

    return async (dispatch, getState ) =>  {

        const token = 'Bearer ' + getState().usuario.token
        await axios.put("https://leds-skills.herokuapp.com/category/"+categoria.id, null, 
                { params: {
                    token,
                    nome: categoria.nome
                    },
                }
            ).then(response => {
                swal({
                    title: "Atualizada",
                    text: 'A categoria foi atualizada com sucesso',
                    icon: "success",
                  }).then((value) => {
                    dispatch(pageCategoria());
                  });
            })
            .catch( error => {
                swal({
                    title: "Error",
                    text: 'Erro na edição da categoria',
                    icon: "error",
                  });
            })
        
    }
}

export const desativarSubCategoria = (nome, id_subcategoria) => {
    return async (dispatch, getState) => {
        swal({
            title: "Deseja desativar a subcategoria?",
            text: "Caso desative a subcategoria: "+nome+", a mesma não poderá ser escolhida no cadastro das atividades",
            icon: "warning",
            buttons: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const token = 'Bearer ' + getState().usuario.token

                await axios.delete("https://leds-skills.herokuapp.com/subcategory/"+id_subcategoria, { params: { token } })
                    .then(response => { 
                        swal({
                            title: "Desativada",
                            text: 'Subcategoria foi desativada com sucesso',
                            icon: "success",
                        }).then((value) => {
                            dispatch(pageEditarSubCategoria());
                            dispatch(pageSubCategoria());
                        });
                    })
                    .catch( error => {
                        swal({
                            title: "Error",
                            text: 'Falha em desativar a subcategoria, tente novamente mais tarde',
                            icon: "error",
                        });
                    })
            }
        });
    }
}

export const desativarCategoria = (nome, id_categoria) => {
    return async (dispatch, getState) => {
        swal({
            title: "Deseja desativar a categoria?",
            text: "Caso desative a categoria: "+nome+", a mesma não poderá ser escolhida no cadastro das subcategorias",
            icon: "warning",
            buttons: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const token = 'Bearer ' + getState().usuario.token

                await axios.delete("https://leds-skills.herokuapp.com/category/"+id_categoria, { params: { token } })
                    .then(response => { 
                        swal({
                            title: "Desativada",
                            text: 'Categoria foi desativada com sucesso',
                            icon: "success",
                        }).then((value) => {
                            dispatch(pageEditarCategoria());
                            dispatch(pageCategoria());
                        });
                    })
                    .catch( error => {
                        swal({
                            title: "Error",
                            text: 'Falha em desativar a categoria, tente novamente mais tarde',
                            icon: "error",
                        });
                    })
            }
        });
    }
}