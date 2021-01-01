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
        <h1>{constants.app} - h111</h1>
      </header>
      <article>
        <Input 
            valid={valid}
            value={amount} 
            onChange={handleChange} 
            onKeyPress={handleKeyEnter}
        />
        <ListDenominations visible={result.visible} data={Object.entries(result.fractioned)}/>
      </article>
      <footer>{constants.footerText}</footer>
    </>
  );
}
