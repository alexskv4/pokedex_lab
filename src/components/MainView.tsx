import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import { RouteComponentProps } from 'react-router'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const MainView: React.FC <RouteComponentProps> = (props) => {

    var elephantRoute = () => {
        props.history.push("/elephants")
    }
    
    var pokemonRoute = () => {
        props.history.push("/pokemon")
    }

    

    return(
        <div>
            <Grid container justify = "center">
                <Grid item><Button variant="contained" color="primary" onClick={elephantRoute}>Elephants</Button></Grid>
                <Grid item><Button variant="contained" color="secondary" onClick={pokemonRoute}>Pokemon</Button></Grid>
            </Grid>
        </div>


    )
}

export default MainView;
