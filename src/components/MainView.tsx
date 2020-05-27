import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import { RouteComponentProps } from 'react-router'


const MainView: React.FC <RouteComponentProps> = (props) => {

    var elephantRoute = () => {
        props.history.push("/elephants")
    }
    
    var pokemonRoute = () => {
        props.history.push("/pokemon")
    }
    
    

    return(
        <div>
            <Button variant="contained" color="primary" onClick={elephantRoute}>Elephants</Button>
            <Button variant="contained" color="secondary" onClick={pokemonRoute}>Pokemon</Button>
        </div>


    )
}

export default MainView;
