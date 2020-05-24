import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import PokemonTextfield from './PokemonTextfield';
import PokemonCard from './PokemonCard';
import { createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider'

function PokemonView(props) {

    const [pokemon, setPokemon] = useState(null);
    const [theme, setTheme] = useState(null);
    const [error, setError] = useState({
        hasError: false,
        errorMessage: null,
    });
    
    var darkTheme = createMuiTheme({
        palette:{
            type: "dark",
        },
    });
    
    var lightTheme = createMuiTheme({
        palette:{
            type: "light"
        },
    });

    var changeTheme = (event) => {
        setTheme(event.target.checked ? darkTheme : lightTheme)
    }
    
    var clearError = () => {
        setError({
            hasError: false, 
            helpertext: null, 
        })
    }

    var loadPokemon = (pokemonName) => {

        var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName; 
        console.log(url)
        
        fetch(url,
        {
            method:"GET",
            headers:{"origin":"localhost"},
        
        })
        .then(res => {return res.json()})
        .then(resData => {setPokemon(
                {
                    name: resData["name"], 
                    weight: resData["weight"], 
                    height: resData["height"],
                    images: resData["sprites"],
                }
        )})
        .catch(error => {setError(
                {
                    hasError: true,
                    errorMessage: "Please enter a valid Pokemon",
                }
        )})
    }

    return(
        <ThemeProvider theme = {theme}>
            <CssBaseline>
                <div>
                    <h1>
                        <Grid container spacing = {4} justify = "center" alignItems = "center">
                            <Grid item><FormControlLabel control = {<Switch color = "primary" onChange = {changeTheme}/>} label = "Dark Theme" labelPlacement = "start"/></Grid>
                            <Grid item><PokemonTextfield loadPokemon = {loadPokemon} error = {error} clearError = {clearError}/></Grid>
                        </Grid>
                    </h1>
                    <h1><Divider/></h1>
                    <PokemonCard pokemon = {pokemon}/>
                </div>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default PokemonView;