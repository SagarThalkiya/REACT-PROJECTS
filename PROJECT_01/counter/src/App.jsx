import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  //let counter = 15;

  let [counter, setCounter] = useState(15) //hookes are used to change update all the ui elemnt releted to the oringinal one

  const addValue = () =>{
    console.log("clicked",counter);
    counter = counter + 1;
    if(counter<=20){
      setCounter(counter);
    }
  }

  const remove = () =>{
      if(counter>0){
        setCounter(counter-1)
      }
  }
  return (  
      <>
      <h1>kem chho mota bhai...</h1>
      <h2>Counter Value: {counter}</h2>
      <button
      onClick={addValue}>ADD VALUE {counter}</button>
      <br />
      <button
      onClick={remove}>SUB VALUE {counter}</button>
      
      <footer>footer: {counter}</footer>
      </>
    )
    
}

export default App
