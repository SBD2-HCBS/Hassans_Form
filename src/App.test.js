import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter, Route, Router} from "react-router-dom";
import {createMemoryHistory} from "history";

const renderWithRouter=(ui, {route='/'} = {}) =>{
  window.history.pushState({}, 'Test Page', route)
  return render(ui, {wrapper: BrowserRouter})
}
const history = createMemoryHistory()
const renderWithRouter2=Component=> render(
    <Router history={history}>
      <Route component={Component}/>
    </Router>
)
jest.mock("react-router-dom",()=>({
  ...jest.requireActual("react-router-dom"),
  useLocation:() => ({
    pathname: 'localhost:3000/viewSingleUser',
  })

}))
test('renders learn react link', () => {
 renderWithRouter(<App/>)
  const linkElement = screen.getByText('Enter App');
  expect(linkElement).toBeInTheDocument();
});
test('should have a button element', () => {
  renderWithRouter(<App/>)
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument();
})
test('should have a lik element', () => {
  renderWithRouter(<App/>)
  const linkElement = screen.getByRole('link')
  expect(linkElement).toBeInTheDocument();

})