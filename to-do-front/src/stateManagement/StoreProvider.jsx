import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
    todo: { category: [], task: {} }
  }

const Store = createContext(initialState)


const StoreProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)
//useReducer is a hook and you have to import it
// dispatch is the trigger that we will be using to generate the state changes

    return(
        <Store.Provider value ={{state, dispatch}}>
            {children}
        </Store.Provider>)
}

export default StoreProvider
export{Store, initialState}