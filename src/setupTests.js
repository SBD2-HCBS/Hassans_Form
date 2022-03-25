// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'

//create a customRender that wraps the UI in a memory Router
const customRender=(ui,options)=>{
    return render(ui, {wrapper: MemoryRouter, ...options})
}
//re-export everything
export * from '@testing-library/react'

//override render method

export {customRender as render};