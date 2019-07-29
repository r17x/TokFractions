/**
 * @name useFractions 
 * @description
 * The Fraction function with React Hook
 */
import {useState} from 'react'
import fraction, {defaultFractioned, validationCurrency, getNumber} from './fractions'

export default function useFractions(){
  const [amount, setAmount] = useState();
  const [result, setResult] = useState({
      visible: false,
    fractioned: defaultFractioned, 
  })
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
  const [valid, setValid] = useState(null)
  return [
      amount,
      result,
      valid,
      handleChange,
      handleKeyEnter,
  ]
}
