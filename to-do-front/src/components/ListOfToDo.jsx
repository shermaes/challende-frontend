import React, { useContext } from 'react'
import { Store } from '../stateManagement/StoreProvider'

const ListOfToDo = () => {

    const {state, dispatch} = useContext(Store)
    console.log(state);
    console.log(state);
  
    return (
      <div>
          <h1>Actions pending to be done</h1>
          <ul>
        {state.map(note=> {
                return <li>
                   category id: {note.id} <br />
                    {note.categoryTitle} <br />
                    <p>---------------------------</p>
              {note.task.map(tsk => tsk.title)} <br />
              {note.task.map(tsk => tsk.message)} <br />
                </li>
            })}
        </ul>
      </div>
    )
  }
//onChange executes an action 
export default ListOfToDo