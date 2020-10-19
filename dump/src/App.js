import React from 'react';
import logo from './logo.svg';
import './App.css';
import NetherlandsSummary from './NetherLandsSummary.js';
import NetherlandsGrowth from './NetherlandsGrowth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>Confirmed cases COVID-19 in the Kingdom of the Netherlands</h4>
        <h6>Netherlands, Sint Maarten, Bonaire, Curacao, Aruba</h6>
        <NetherlandsSummary/>

        <h4>Growth of COVID-19 in the Netherlands</h4>
        <blockquote>*Note: no recovered data available for the Netherlands</blockquote>
        <NetherlandsGrowth />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
