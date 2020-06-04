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


// interface PokemonData {
//     name?: string
//     weight?: string
//     height?: string
//     images?: string
// }

const PokemonView: React.FC = () => {

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
    
    const [pokemon, setPokemon] = useState({});
    const [theme, setTheme] = useState(lightTheme);
    const [error, setError] = useState({
        hasError: false,
        errorMessage: "",
    });
    
    var changeTheme = (event: any) => {
        setTheme(event.target.checked ? darkTheme : lightTheme)
    }
    
    var clearError = () => {
        setError({
            hasError: false, 
            errorMessage: "", 
        })
    }

    var loadPokemon = (pokemonName: string) => {

        var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName; 
        
        
        fetch(url,
        {
            method:"GET",
            headers:{"origin":"localhost"},
        
        })
        .then(res => {return res.json()})
        .then(resData => {
            console.log(resData)

            const abilityArr = resData.abilities.map(function(item: any) {return item.ability.name})

            setPokemon(
                {
                    name: resData["name"], 
                    weight: resData["weight"], 
                    height: resData["height"],
                    images: resData["sprites"],
                    abilities: abilityArr.toString(),
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