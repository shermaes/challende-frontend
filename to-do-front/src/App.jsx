import { useState } from 'react'
import StoreProvider from './stateManagement/StoreProvider'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="My To-Do app">
      <header className="To-do-header">
        <h1 style={{backgroundColor: "orange"}}>My To-Do app</h1>
      </header>
      <StoreProvider>
      <h1 style={{backgroundColor: "orange"}}>Here's what you have to do today</h1>
      <Form/>
    </StoreProvider>
    </div>
  )
}

export default App
