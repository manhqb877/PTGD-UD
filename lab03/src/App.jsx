import { useState } from 'react'
import reactLogo from '../img/th.jpg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent from '../../lab03/src/component/MyComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      <MyComponent />
      </div>
      
    </>
  )
}

export default App
