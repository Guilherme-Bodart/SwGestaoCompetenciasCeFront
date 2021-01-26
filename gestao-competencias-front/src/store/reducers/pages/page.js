import { PAGE_LOGIN, 
    PAGE_CADASTRO,
    PAGE_RECUPERAR,
    PAGE_ENVIAREMAIL
} from '../../actions/actionsTypes'

const initialState = {
    page: 'login',
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case PAGE_CADASTRO:
       var page = 'cadastro'

       return {
           ...state, page
       }

   case PAGE_LOGIN:
        var page = 'login'
        return {
            ...state, page
        }

   case PAGE_RECUPERAR:
        var page = 'recuperar'
        return {
            ...state, page
        }
    
    case PAGE_ENVIAREMAIL:
        var page = 'enviarEmail'
        return {
            ...state, page
        }

   
   default:
       return state
}
}

export default reducer