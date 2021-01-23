import { ALERT_IN, ALERT_OUT } from '../actionsTypes'


export const alertout = () => {
    return {
        type: ALERT_OUT
    }
}

export const alertin = alerta => {
    return {
        type: ALERT_IN,
        payload: alerta,
    }
}
