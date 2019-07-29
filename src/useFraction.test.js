import { renderHook, act } from '@testing-library/react-hooks'
import useFractions  from './useFraction'
import fraction, {defaultFractioned as fractioned } from './fractions'

test('useFraction hook test', () => {
    const { result } = renderHook(useFractions)

    const defaultValue = [
        undefined,
        {visible: false, fractioned},
        null,
    ] 

    expect(result.current[0]).toBe(defaultValue[0])
    expect(result.current[1]).toStrictEqual(defaultValue[1])
    expect(result.current[2]).toStrictEqual(defaultValue[2])
    expect(result.current[1].visible).toBeFalsy()


    const changeAmount = 1000

    const fakeEvent = {
        key: 'Enter'
    }

    act(() => {
         result.current[3](changeAmount)
    })

    expect(result.current[0]).toBe(changeAmount)
    expect(result.current[2]).toBeTruthy()
    expect(result.current[1].visible).toBeFalsy()

    act(() => {
        result.current[4](fakeEvent) 
    })
    expect(result.current[1].visible).toBeTruthy()
    expect(result.current[1].fractioned).toStrictEqual(fraction(
        result.current[0]
    ))

    
})
