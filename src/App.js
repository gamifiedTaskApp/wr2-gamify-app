import React from 'react';
import Nav from './ponents/Nav/Nav'
import './App.css';
import routes from './routes';
import Parent from "./ponents/Parent/Parent"
function App() {
  return (
    <div className="App">

      <header className="App-header">
        <p>
          Grant branch
        </p>
       
      </header>
      <Nav/>
      {routes}
      <Parent />
    </div>
  );
}

export default App;
