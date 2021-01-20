import { LOGIN_USUARIO, 
    LOGOUT_USUARIO,
    GET_USUARIOS
} from '../../actions/actionsTypes'

const initialState = {
email: '',
nome: '',
token: '',
_id: '',
cargo: '',
getUsuarios: {}
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case LOGIN_USUARIO:
       let { email, nome, _id, cargo } = action.payload.user;
       let token = action.payload.token

       return {
           ...state, email, nome, token, _id, cargo
       }

   case LOGOUT_USUARIO:
       return initialState

   case GET_USUARIOS:
       let getUsuarios = action.payload
       return {                
           ...state, getUsuarios
       }
   
   default:
       return state
}
}

export default reducer