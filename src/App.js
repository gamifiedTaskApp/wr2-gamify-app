import React from 'react';
import Nav from './components/Nav/Nav'
import './App.css';
import routes from './routes';
import Parent from './components/Parent/Parent'

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
      <Parent/>
    </div>
  );
}

export default App;
