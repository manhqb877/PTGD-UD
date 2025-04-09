import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import StackedExample from './assets/component/Heade';
import NavScrollExample from './assets/component/body';
import Left from './assets/component/left'
import Content from './assets/component/content'
function App() {

  return (
    <>
    <div className='sm d-flex justify-content-center'>
      <div className='sm-4'><Left/></div>
      <div className='sm-8'><Content/></div>
    </div>
      
      {/* <StackedExample/>
      <NavScrollExample/> */}
    </>
  )
}

export default App
