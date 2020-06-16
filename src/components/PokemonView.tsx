import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import PokemonTextfield from './PokemonTextfield';
import PokemonGrid from './PokemonGrid';
import { createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import {red, grey} from '@material-ui/core/colors';
import PressStart2P from './fonts/PressStart2P.ttf';


const pressStart2P = {
    fontFamily: 'PressStart2P',
    src: `local('PressStart2P'), url(${PressStart2P}) format('truetype')`
}


const PokemonView: React.FC = () => {

    // const [pokemons, setPokemons] = useState(Array<Object>([]));

    let pokemonArr: Array<object> = [];
    console.log(pokemonArr)
    var darkTheme = createMuiTheme({
        typography:{
            fontFamily: 'PressStart2P',
            fontSize: 12
            // fontWeightRegular: "bolder"
        },

        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': [pressStart2P]
                }
            }
        },

        palette:{
            primary: red,
            secondary: grey,
            type: "dark",
        },
    });
    
    var lightTheme = createMuiTheme({
        typography:{
            fontFamily: 'PressStart2P',
            fontSize: 12
            //fontWeightRegular: "bolder"
        },

        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': [pressStart2P]
                }
            }
        },

        palette:{
            primary: red,
            secondary: grey,
            type: "light",
        },
    });
    
    const [pokemons, setPokemons] = useState(Array<Object>());
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
            //console.log(resData)

            const abilityArr = resData.abilities.map(function(item: any) {return item.ability.name})
            
            pokemonArr.push(
                {
                    name: resData["name"], 
                    weight: resData["weight"], 
                    height: resData["height"],
                    images: resData["sprites"],
                    id: resData["id"],
                    abilities: abilityArr.toString(),
                }
            );
            
            // console.log(pokemonArr)

            setPokemons(
                [...pokemons, ...pokemonArr]
            );
            // console.log(pokemons)
        })
        .catch(error => {setError(
                {
                    hasError: true,
                    errorMessage: "Please enter a valid Pokemon",
                }
        )})
    }

    let removePokemon = (pokemon: object, e: any) => {
        console.log(pokemon, e);
        let data: object[] = [...pokemons]
        const index = data.indexOf(pokemon)
        data.splice(index, 1);
        setPokemons(data)
    }

    return(
        <ThemeProvider theme = {theme}>
            <CssBaseline>
                <div>
                    <h1>
                        <Grid container spacing = {4} justify = "center" alignItems = "center">
                            <Grid item><FormControlLabel control = {<Switch color = 'primary' onChange = {changeTheme}/>} label = "Dark Theme" labelPlacement = "start"/></Grid>
                            <Grid item><PokemonTextfield loadPokemon = {loadPokemon} error = {error} clearError = {clearError}/></Grid>
                        </Grid>
                    </h1>
                    <h1><Divider/></h1>
                    <PokemonGrid removePokemon = {removePokemon} pokemonArr = {pokemons}/>
                </div>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default PokemonView;