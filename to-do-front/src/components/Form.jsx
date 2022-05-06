import React, {useContext, useRef, useState} from 'react'
import { Store } from '../stateManagement/StoreProvider';


const Form = () => {

  
    const formRef = useRef(null);
    const { state, dispatch } = useContext(Store);

    const [categoryTitle, setCategoryTitle] = useState('')

    console.log(categoryTitle);

    const onAdd = (event) => {
      event.preventDefault();
      if(categoryTitle){
          dispatch({
              type: 'add-category',
              payload: {
                  categoryTitle
              }
          })
          formRef.current.reset();
      }
  }

    return <form ref={formRef}>
      <input type="text" name="name" placeholder="Here goes the category" defaultValue={state.categoryTitle} onChange={(event) => {
          setCategoryTitle(event.target.value)
        }}>      
        </input>
      {!state.id && <button onClick={onAdd}>Add Category</button>}
    </form>
  }

export default Form
  