/**
 * @name useFractions 
 * @description
 * The Fraction function with React Hook
 */
import {useState, useCallback} from 'react'
import fraction, {defaultFractioned, validationCurrency, getNumber} from './fractions'

export default function useFractions(){
  const [amount, setAmount] = useState();
  const [result, setResult] = useState({
    visible: false,
    fractioned: defaultFractioned, 
  })
  const [valid, setValid] = useState(null)

  const handleChange = useCallback((value) =>  {
      setAmount(value)
      setValid(validationCurrency(value))
  },[])

  const handleKeyEnter = useCallback((e) => {
    if(e.key === 'Enter' && valid){
        setResult({
          visible: !result.visible,
          fractioned: fraction(getNumber(amount))
        })
    }
  },[amount, valid, result ]
 )  
    return [
      amount,
      result,
      valid,
      handleChange,
      handleKeyEnter,
  ]
}
