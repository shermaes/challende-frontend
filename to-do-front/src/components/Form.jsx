import React, {useContext, useRef, useState} from 'react'
import { Store } from '../stateManagement/StoreProvider';


const Form = () => {

  const{state, dispatch} = useContext(Store)

  const [name, setName] = useState('');


    const formRef = useRef(null);

    const onAdd = async (event) => {
      event.preventDefault();
      if(name){
          const categoryFromForm = {
              name
          }
          let categorySavedPromise = await fetch(`http://localhost:8081/api/save/category`, 
          {
              method: 'POST',
              headers:{
                'Content-type': 'application/json'  
              },
              body: JSON.stringify(categoryFromForm)
              
          })

          let categorySaved = await categorySavedPromise.json();
          console.log(categorySaved)


          dispatch({
              type: 'add-category',
              payload: categorySaved
          })

          formRef.current.reset();
      }
  }

  const addingName = (e)=>{
    setName(e.target.value)  
}

  return (
    <form ref={formRef}>
        <label>Category:</label>
        <input onChange={addingName} type="text" name= "title"/>
        <button onClick={onAdd}>Add a list</button>
    </form>
  )

}


export default Form
  