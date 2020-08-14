import React from 'react';
import './App.css';
import routes from './routes';
import Parent from './Components/Parent/Parent'

function App() {
  return (
    <div className="App">
      {routes}
      <Parent/>
    </div>
  );
}

export default App;
