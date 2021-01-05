import React from 'react';
import NavBar from './components/navigation/NavBar';
import Routes from './routes/routes';

import './App.css';

function App({ history }) {
  return (
    <div id="App">
      <NavBar history={history} />
      <Routes />
    </div>
  );
}

export default App;
