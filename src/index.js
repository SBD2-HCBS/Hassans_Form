import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './ducks/store'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddUser from './components/AddUser'
import ViewSingleUser from './components/ViewSingleUser'
import ViewContainer from "./components/ViewContainer";
import Edit from './components/Edit'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/adduser' element={<AddUser/>} />
                <Route path='/viewSingleUser' element={<ViewSingleUser/>}/>
                <Route path='/viewContainer' element={<ViewContainer/>}/>
                <Route path='/editUser' element={<Edit/>}/>
            </Routes>

</Router>
    </Provider>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
