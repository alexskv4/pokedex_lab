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
import Drawer from '@material-ui/core/Drawer';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useEffect } from 'react';
import shortid from 'shortid';


const pressStart2P = {
    fontFamily: 'PressStart2P',
    src: `local('PressStart2P'), url(${PressStart2P}) format('truetype')`
}


const PokemonView: React.FC = () => {

    // console.log(pokemonArr)

    let darkTheme = createMuiTheme({
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
    
    let lightTheme = createMuiTheme({
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
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [theme, setTheme] = useState(lightTheme);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState(Array<Object>());
    const [pokemonListURL, setPokemonListURL] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [error, setError] = useState({
        hasError: false,
        errorMessage: "",
    });
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    }
    
    var changeTheme = (event: any) => {
        setTheme(event.target.checked ? darkTheme : lightTheme)
    }
    
    var clearError = () => {
        setError({
            hasError: false, 
            errorMessage: "", 
        })
    }

    let loadPokemonList = () => {
        setButtonDisabled(true)
        fetch(pokemonListURL, 
            {
                method: "GET",
                headers: {"origin" : "localhost"}
            })
        .then(res => {return res.json()})
        .then (resData => {
            let pokemonListArr = resData.results.map(function(item: any, index: number) {return <Grid item key = {shortid.generate()}><Link onClick = {() => loadPokemon(item.name)}>{item.name}</Link></Grid>})
            setPokemonListURL(resData.next)
            setPokemonList([...pokemonList, ...pokemonListArr])
            console.log(resData.next)
        })        
    }

    useEffect(() => {setButtonDisabled(false)}, [pokemonListURL])

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
            
            let pokemon = {
                        uuid: shortid.generate(),
                        name: resData["name"], 
                        weight: resData["weight"], 
                        height: resData["height"],
                        images: resData["sprites"],
                        id: resData["id"],
                        abilities: abilityArr.toString(),
                    }
  
            console.log(pokemons)
            
            setPokemons( pokemons => [...pokemons, pokemon])

            console.log(pokemons)
        })
        .catch(er => {setError(
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
                <Appbar>
                    <Toolbar>
                        <Grid container justify = "space-between" alignItems = "center">
                            <Grid item>
                                <IconButton onClick = {handleDrawerOpen}>
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <PokemonTextfield loadPokemon = {loadPokemon} error = {error} clearError = {clearError}/>
                            </Grid>
                            <Grid item>
                                <FormControlLabel control = {<Switch color = 'secondary' onChange = {changeTheme}/>} label = "Dark Theme" labelPlacement = "start"/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Appbar>
                <div> 
                    <Drawer variant = "persistent" anchor = "left" open = {drawerOpen}>
                        <Grid container direction = "column" alignItems = "center">
                            <Grid item>
                                <IconButton onClick = {handleDrawerClose}>
                                    <BackIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item><Divider/></Grid>
                            {pokemonList}
                            <Grid item><Button disabled = {buttonDisabled} onClick = {loadPokemonList}>load more</Button></Grid>
                        </Grid>
                    </Drawer>
                    <main>
                        <h1>
                            <Grid container spacing = {4} justify = "center" alignItems = "center">
                                <Grid item><FormControlLabel control = {<Switch color = 'primary' onChange = {changeTheme}/>} label = "Dark Theme" labelPlacement = "start"/></Grid>
                            </Grid>
                        </h1>
                        <PokemonGrid removePokemon = {removePokemon} pokemonArr = {pokemons}/>
                    </main>
                </div>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default PokemonView;