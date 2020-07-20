import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import PokemonTextfield from './PokemonTextfield';
import PokemonGrid from './PokemonGrid';
import { createMuiTheme, ThemeProvider, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useEffect } from 'react';
import shortid from 'shortid';
import clsx from 'clsx';



const pressStart2P = {
    fontFamily: 'PressStart2P',
    src: `local('PressStart2P'), url(${PressStart2P}) format('truetype')`
}


const PokemonView: React.FC = () => {

    const drawerWidth = 240;

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            appBarShift: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
                transition: theme.transitions.create(['margin', 'width'], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            },
            toolBar: {
                height: 80,
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
            },
            drawerHeader: {
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(0, 1),
                ...theme.mixins.toolbar,
                justifyContent: 'flex-end',
            },
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                marginLeft: drawerWidth,
                marginTop: 70,
            },
            contentShift: {
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
                marginTop: 70,
            },
        }) 
    )

    let darkTheme = createMuiTheme({
        typography:{
            fontFamily: 'PressStart2P',
            fontSize: 12
        },

        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': [pressStart2P]
                }
            },
            MuiFormHelperText: {
                root: {
                    '&$error' : {color: 'black'},
                },
                error: {}
            },
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
        },

        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': [pressStart2P]
                }
            },
            MuiFormHelperText: {
                root: {
                    '&$error' : {color: 'black'}    
                },
                error: {}
            },
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
    const classes = useStyles();

    const handleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }
    
    let changeTheme = (event: any) => {
        setTheme(event.target.checked ? darkTheme : lightTheme)
        
    }
    
    let clearError = () => {
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
            let pokemonListArr = resData.results.map(function(item: any, index: number) {return <Grid item key = {shortid.generate()}><Button onClick = {() => loadPokemon(item.name)}>{item.name}</Button></Grid>})
            setPokemonListURL(resData.next)
            setPokemonList([...pokemonList, ...pokemonListArr])
            console.log(resData.next)
        })        
    }

    useEffect(() => {setButtonDisabled(false)}, [pokemonListURL])

    let loadPokemon = (pokemonName: string) => {

        let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName; 
        
        
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
                <Appbar className = {clsx(classes.appBar, {
                        [classes.appBarShift]: drawerOpen,
                    })}>
                
                    <Toolbar className = {classes.toolBar}>
                        <Grid container justify = "space-between" alignItems = 'center'>
                            <Grid item>
                                <IconButton onClick = {handleDrawer}>
                                    {drawerOpen? <BackIcon/> : <ForwardIcon/>}
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
                    <Drawer className = {classes.drawer} classes = {{paper: classes.drawerPaper}} variant = "persistent" anchor = "left" open = {drawerOpen}>
                        <Grid container direction = "column" alignItems = "center">
                            {pokemonList}
                            <Grid item><Button variant = "contained" color = "primary" disabled = {buttonDisabled} onClick = {loadPokemonList}>load more</Button></Grid>
                        </Grid>
                    </Drawer>
                    <main className = {clsx(classes.content, {[classes.contentShift]: !drawerOpen,})}>
                        <PokemonGrid removePokemon = {removePokemon} pokemonArr = {pokemons}/>
                    </main>
                </div>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default PokemonView;