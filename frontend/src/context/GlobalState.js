import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

//initial state
const initialState = {
    authenticated: false,
    username: null
}

//Creating context
export const GlobalContext = createContext(initialState)

//Creating a provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    function setAuthenticated(value) {
        dispatch({
            type: 'SET_AUTHENTICATED',
            payload: value
        })
    }

    function setUsername(value) {
        dispatch({
            type: 'SET_USERNAME',
            payload: value
        })
    }

    return (
        <GlobalContext.Provider value={{
            authenticated: state.authenticated,
            username: state.username,
            setAuthenticated,
            setUsername
        }}>
            {children}
        </GlobalContext.Provider>
    )
}