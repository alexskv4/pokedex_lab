import React from 'react';
import Button from '@material-ui/core/Button';
import MainView from './components/MainView';
import PokemonView from './components/PokemonView';
import ElephantView from './components/ElephantView';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const App: React.FC = () => {
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


export default App;
