import React from 'react'
import {string, func} from 'prop-types'

export function Input({value, onChange, onKeyPress, valid }) {
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

Input.propTypes = {
    value: string,
    onChange: func,
    onKeyPress: func,
}

export function ListDenominations({data}){
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


