import React from 'react';
import { Route } from 'react-router-dom'
import AddPark from './AddPark/AddPark.js'
import ParkList from './ParkList/ParkList.js'
import ParkDetails from './ParkDetails/ParkDetails.js'
import Landing from './Landing/Landing.js'

import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Your Favorite National Parks</h1>
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route exact path="/parks" render={(routeProps) => <ParkList routeProps={routeProps}/>} />
        <Route exact path="/addPark" render={(routeProps) => <AddPark routeProps={routeProps}/>} />
        <Route exact path="/parks/:park_id" render={(routeProps) => <ParkDetails routeProps={routeProps}/>} />
      </main>
    </div>
  );
}

export default App;
