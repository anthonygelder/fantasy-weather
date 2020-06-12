import React from 'react';
import { Route } from 'react-router-dom'
import AddPark from './AddPark/AddPark.js'
import ParkList from './ParkList/ParkList.js'
import ParkDetails from './ParkDetails/ParkDetails.js'

import './App.css';

function App() {
  return (
    <div className="app">
        <header>
          <h1>National Parks</h1>
        </header>
        <main>
          <Route exact path="/" render={(routeProps) => <ParkList routeProps={routeProps}/>} />
          <Route exact path="/addPark" render={(routeProps) => <AddPark routeProps={routeProps}/>} />
          <Route exact path="/park/:park_id" render={(routeProps) => <ParkDetails routeProps={routeProps}/>} />
        </main>
    </div>
  );
}

export default App;
