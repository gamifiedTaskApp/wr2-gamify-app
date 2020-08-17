import React from 'react';
import Nav from './components/Nav/Nav'
import './App.css';
import routes from './routes';

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
    </div>
  );
}

export default App;
