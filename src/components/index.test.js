import React from 'react'
import {Input, ListDenominations} from '.'

import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'

test('Input Component', () => {
    const {container, getByLabelText} = render(<Input/>)
    const input = getByLabelText('input-text') 
    expect(input.value).toBe("")
    expect(input.type).toBe("text")
    expect(container).toMatchSnapshot()
})

test('ListDenominations Component', () => {
    const {container} = render(<ListDenominations data={[]}/>)
    expect(container).toMatchSnapshot()
})
