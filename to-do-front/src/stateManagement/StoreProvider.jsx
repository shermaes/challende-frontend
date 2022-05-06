import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = [{
            id:1,
            categoryTitle:"This is the name of category",
            task: [{
                id:2,
                title: "title of the task test",
                message:"message test",
                done:false,
                fkCategoryId:1
            }] 
    }]


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