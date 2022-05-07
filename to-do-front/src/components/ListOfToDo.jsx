import React, { useContext, useEffect } from 'react'
import { Store } from '../stateManagement/StoreProvider'

const ListOfToDo = () => {

    const {state, dispatch} = useContext(Store)

    useEffect(()=> {
        let listOfCategories = fetchAllCategories().then(
            categories=>{
             let action = {
                 type: 'get-categories',
                 payload: categories
                } 
            dispatch(action)  
            }
        )
  }, [])

  const fetchAllCategories = async() =>{
    let response = await fetch(`http://localhost:8081/api/get/categories`)
    let data = await response.json()
    return data
}
 
const onCheckbox = async (event, tsk) => {
    const checked = event.currentTarget.checked;

    const taskToUpdate = {
        ...tsk,
        done: checked
    }

        // console.log(taskToUpdate);
    let taskUpdatedPromise = await fetch(`http://localhost:8081/api/update/task`, 
      {
          method: 'PUT',
          headers:{
            'Content-type': 'application/json'  
          },
          body: JSON.stringify(taskToUpdate)  
      })

      let categoryUpdated = await taskUpdatedPromise.json()
      
      const taskUpdated = categoryUpdated.tasks.find(task => task.id === taskToUpdate.id)

    dispatch({
        type: 'update-task',
        payload:taskUpdated
    })
     }

     const onDeleteCategory = async (note)=> {
         console.log(note)
         let response = await fetch(`http://localhost:8081/api/delete/category/${note.id}`, 
         {
             method: 'DELETE'
         })
    
         if(response.status === 200){
           dispatch({
            type: 'remove-category',
            payload: note 
           })
        }}


    return (
    
      <div>
          <h1>Actions pending to be done</h1>
          <ul>
         {state.map(note=> {
                return <div key={note.id}>
                    
                    {note.name} <br />
                    <button onClick={()=> onDeleteCategory(note)}>Delete</button>
                    {note.tasks.map(tsk => 
                        <li key={tsk.id}>{tsk.title} <br />
                        {tsk.message}
                        <input onChange={(event) => onCheckbox(event, tsk)} type="checkbox"  checked={tsk.done}/>
                        </li>    
                        )} <br />
                    <p>---------------------------</p>
                </div>
            })}
        </ul>
      </div>
    )
  }

//onChange executes an action 
export default ListOfToDo