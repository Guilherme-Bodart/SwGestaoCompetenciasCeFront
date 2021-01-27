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
        page = 'login'
        return {
            ...state, page
        }

   case PAGE_RECUPERAR:
        page = 'recuperar'
        return {
            ...state, page
        }
    
    case PAGE_ENVIAREMAIL:
        page = 'enviarEmail'
        return {
            ...state, page
        }

   
   default:
       return state
}
}

export default reducer