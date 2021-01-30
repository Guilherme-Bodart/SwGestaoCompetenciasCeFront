import { LOGIN_USUARIO, 
    LOGOUT_USUARIO,
    GET_USUARIOS,
    GET_USUARIO
} from '../../actions/actionsTypes'

const initialState = {
    email: '',
    nome: '',
    token: '',
    _id: '',
    permissao: '',
    usuarios: [],
    getUsuario: {},
    logado: false,
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case LOGIN_USUARIO:
        let { email, _id, permissao } = action.payload.usuario;
        let token = action.payload.token
        let logado = true
        return {
            ...state, email, nome: action.payload.usuario.pessoa.nome, token, _id, permissao, logado
        }

   case LOGOUT_USUARIO:
       return initialState

   case GET_USUARIOS:
       let usuarios = []
       usuarios = action.payload.usuarios
       return {                
           ...state, usuarios
       }
    
    case GET_USUARIO:
        let getUsuario = {}
        getUsuario = action.payload.usuario
        return {                
            ...state, getUsuario
        }
   
   default:
       return state
}
}

export default reducer