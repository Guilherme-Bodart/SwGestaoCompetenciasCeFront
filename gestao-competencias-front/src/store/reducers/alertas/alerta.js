import { ALERT_IN, 
    ALERT_OUT,
} from '../../actions/actionsTypes'

const initialState = {
    open: false,
    alertTitle: '',
    severity: '',
    texto: ''
}

const reducer = (state = initialState, action) => {

switch (action.type) {

   case ALERT_IN:
        let { alertTitle, severity, texto } = action.payload;
        let open = true;
        return {
            ...state, open, alertTitle, severity, texto
        }

   case ALERT_OUT:
        return initialState
   
   default:
        return state
}
}

export default reducer