import React from 'react';
// import { Route } from 'react-router-dom'
import ParkList from './ParkList/ParkList.js'

import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Park Weather</h1>
      <ParkList />
    </div>
  );
}

export default App;
