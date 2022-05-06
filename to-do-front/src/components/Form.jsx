import React, {useContext, useRef, useState} from 'react'
import { Store } from '../stateManagement/StoreProvider';


const Form = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const task = todo.task;
    const [state, setState] = useState(task);

    const onAdd = (event) => {
      event.preventDefault();

    }

    return <form ref={formRef}>
      <input type="text" name="name" placeholder="Here goes the category" defaultValue={task.name} onClick={(event) => {
          setState({ ...state, name: event.target.value })
        }}>      
        </input>
      {!task.id && <button onClick={onAdd}>Add Category</button>}
    </form>
  }

export default Form
  