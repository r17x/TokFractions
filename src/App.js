import React, { useState } from "react";
import {string, func} from 'prop-types'
import fraction, {defaultFractioned, validationCurrency, getNumber} from './fractions'
import constants from './constants'
import "./App.css";

function Input({value, onChange, onKeyPress, valid }) {
  const handleChange = (e) => {
      typeof onChange === 'function' && onChange(e.target.value, e) 
  }
  return (
    <input
      type="text"
      aria-label="amount"
      value={value}
      className={ valid ? 'success' : valid === false ? 'error' : '' }
      onChange={handleChange}
      onKeyPress={onKeyPress}
      placeholder="Rp 500"
    />
  );
}

function ListDenominations({data}){
    const renderList = (item ,key) => (
        <li key={key}>
            {item.map((li,i) => <span key={i}>{li}</span>)}
        </li>
    )
    return (
        <ul>
            {data.map(renderList)}
        </ul>
    ) 
}

Input.propTypes = {
    value: string,
    onChange: func,
    onKeyPress: func,
}

export default function App() {
  const [amount, setAmount] = useState();
  const [result, setResult] = useState({
      visible: false,
    fractioned: defaultFractioned, 
  })

    const [valid, setValid] = useState(null)

    const handleChange = (value, e) =>  {
        e.persist()
        setAmount(value)
        setValid(validationCurrency(value))
    }

    const handleKeyEnter = (e) => {
        if(e.key === 'Enter' && valid && e.target.value){
            setResult({
              visible: !result.visible,
              fraction: fraction(getNumber(amount))
            })
        }
    }

        
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
