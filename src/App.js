import './App.css';
import React from 'react'
import {Link} from 'react-router-dom'


function App() {


  return (
      <div className="App">
       <Link to='/addUser'>
        <button>Enter App</button>
       </Link>
      </div>
  );
}

export default App;
