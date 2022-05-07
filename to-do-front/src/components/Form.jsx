import React, {useContext, useRef, useState} from 'react'
import { initialState, Store } from '../stateManagement/StoreProvider';


const Form = () => {

  
    const formRef = useRef(null);
    const { initialState, dispatch } = useContext(Store);

    const [name, setName] = useState('')
    const onAdd = (event) => {
      event.preventDefault();
      if(name){
          dispatch({
              type: 'add-category',
              payload: {
                  name
              }
          })
          formRef.current.reset();
      }
  }

    return 
  }

export default Form
  