import React, { useContext, useEffect } from 'react'
import { Store } from '../stateManagement/StoreProvider'

const ListOfToDo = () => {

    const {state, dispatch} = useContext(Store)

    useEffect(()=> {
        let listOfCategories = fetchAllCategories().then(
            categories=>{
                console.log(categories);

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

    

    return (
      <div>
          <h1>Actions pending to be done</h1>
          <ul>
        {state.map(note=> {
                return <li>
                   category id: {note.id} <br />
                    {note.categoryTitle} <br />
                    <p>---------------------------</p>
                </li>
            })}
        </ul>
      </div>
    )
  }
//onChange executes an action 
export default ListOfToDo