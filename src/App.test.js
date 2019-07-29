import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {render, fireEvent, wait, waitForElement } from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Test the Fraction', async () => {
    const {container, getByTestId, getByLabelText} = render(<App/>)
    const input = getByLabelText('input-text')
    const list = getByTestId("list-denominations")

    expect(list).not.toBeVisible()

    expect(input.value).toBe("")
    expect(container).toContainElement(input)

    const changeInput = "10.000"
    fireEvent.change(input, {target: {value: changeInput }})
    
    expect(input.value).toBe(changeInput)
    expect(input).toHaveClass('success')

    const eventEnter = {
        key: 'Enter',
        code: 13,
        charCode: 13,
    } 

    fireEvent.keyPress(input, eventEnter)

    await wait(() => {
        expect(list).toBeVisible()
        fireEvent.keyPress(input, eventEnter)
        expect(list).not.toBeVisible()
    })
})
