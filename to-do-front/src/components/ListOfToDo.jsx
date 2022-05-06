import React, { useContext } from 'react'
import { Store } from '../stateManagement/StoreProvider'

const ListOfToDo = () => {

    const {state, dispatch} = useContext(Store)
    console.log(state);
    console.log(state.listOfCategories);
  
    return (
      <div>
          <h1>Actions pending to be done</h1>
          <ul>
        {state.listOfCategories.map(note => {
                return <li> 
                {note.category} <br />
                {note.task} <br />
                </li>
            })}
        </ul>
      </div>
    )
  }
//onChange executes an action 
export default ListOfToDo