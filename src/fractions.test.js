import each from 'jest-each'
import fraction, {getNumber, validationCurrency, defaultFractioned } from './fractions'


describe('Test Fraction', () => {
    const eachParam = [
        [22500, {...defaultFractioned , 20000: 1,  1000: 2, 500: 1}],
        [22222, {...defaultFractioned , 20000: 1, 1000: 2, 100: 2, no: 22}],
        [15000, {...defaultFractioned , 10000: 1, 5000: 1}],
        [3900, {...defaultFractioned , 1000: 3, 500: 1, 100: 4}],
        [12510, {...defaultFractioned , 10000: 1, 1000: 2, 500: 1,  no: 10 }],
    ]
    
    const reduceResult = (acc, cur) => {
        if(isFinite(cur[0]))
            acc += (Number(cur[0]) * Number(cur[1]))
        else
            acc += Number(cur[1])
        return acc
    }
    
    each(eachParam)
        .test('fraction amount %d is %p', 
        (amount, expected) => {
            const result = fraction(amount)
            expect(result).toStrictEqual(expected)
        })
    
    each(eachParam)
        .test('equal result and fraction amount %s', 
        (amount, expected) => {
            const result = fraction(amount)
            expect(Object.entries(result).reduce(reduceResult,0)).toEqual(amount)
        })
 
})
           

describe('Test Validation Currency', () => {
    const eachParam = [
        [18.215, true],
        ['Rp17500', true],
        ['17.500,00', true],
        ['Rp 120.325', true],
        ['005.000', true],
        ['22222', true],
        ['Rp 22222', true],
        ['Rp 22.222', true],
        ['Rp 22.222,00', true],
        ['Rp .22.222,00,000,000.0000', false],
        ['001000', true],
        ['17,500', false],
        ['2 500', false],
        ['3000 Rp', false],
        ['Rp', false]
    ]    

    each(eachParam)
        .test('Should value %p has return %s', (value, expected ) => {
            const validation = jest.fn(validationCurrency)
            expect(validation(value)).toBe(expected)
            expect(validation).toHaveBeenCalledWith(value)
        })
})

describe('Get Only Number or Digit', () => {
    const eachParam = [
        ['00000_$*($%*asdfasdf', 0] ,
        ['number_IS21211414)_2342423', 212114142342423],
        [null, 0],
        [undefined, 0]
    ]

    each(eachParam)
        .test('should %s has return %s', (maybeNumber, expected ) => {
            expect(getNumber(maybeNumber)).toBe(expected) 
        })
})

