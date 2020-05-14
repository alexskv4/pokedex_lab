import React from 'react';
import './App.css';
import ElephantView from './components/ElephantView';
import MainView from './components/MainView'
import PokemonView from './components/PokemonView'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path='/' component={MainView}/>
        <Route path='/pokemon' component={PokemonView}/>
        <Route path='/elephants' component={ElephantView}/>
      </Switch>
    </Router>

  )
}


// function App() {
//   return(
//     <div>
//       <ElephantView/>
//     </div>
//     );
// }

export default App;
