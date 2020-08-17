import React from 'react';
import Nav from './components/Nav/Nav'
import './App.css';
import routes from './routes';
import Parent from './Components/Parent/Parent'

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          aaron branch
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Nav/>
      {routes}
      <Parent/>
    </div>
  );
}

export default App;
