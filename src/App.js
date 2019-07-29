import React from "react";
import {Input, ListDenominations} from './components'
import useFractions from './useFraction'
import constants from './constants'
import "./App.css";

export default function App() {
  const [amount,result,valid,handleChange,handleKeyEnter] = useFractions()
  return (
    <>
      <header>
        <h1>{constants.app}</h1>
      </header>
      <article>
        <form onSubmit={e => e.preventDefault()}>
            <Input 
                valid={valid}
                value={amount} 
                onChange={handleChange} 
                onKeyPress={handleKeyEnter}
            />
        </form>
        {result.visible && (
            <ListDenominations data={Object.entries(result.fraction)}/>
        )}
      </article>
      <footer>{constants.footerText}</footer>
    </>
  );
}
