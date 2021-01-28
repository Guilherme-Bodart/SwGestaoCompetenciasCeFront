import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import alertaReducer from './reducers/alertas/alerta'
import usuarioReducer from './reducers/usuarios/usuario'
import pageReducer from './reducers/pages/page'
import adminViewReducer from './reducers/adminViews/adminView'
import categoriaReducer from './reducers/categorias/categoria'

const reducers = combineReducers({
    usuario: usuarioReducer,
    alerta: alertaReducer,
    page: pageReducer,
    adminView: adminViewReducer,
    categoria: categoriaReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const storeConfig = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(storeConfig)

export { storeConfig, persistor }