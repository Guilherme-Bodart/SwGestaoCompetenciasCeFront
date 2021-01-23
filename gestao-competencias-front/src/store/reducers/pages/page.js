import { PAGE_LOGIN, 
    PAGE_CADASTRO,
    PAGE_RECUPERAR
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

   
   default:
       return state
}
}

export default reducer