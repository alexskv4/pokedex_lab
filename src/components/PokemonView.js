import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import PokemonTextfield from './PokemonTextfield';
import PokemonCard from './PokemonCard';
import { createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';

class PokemonView extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemon: null,
            theme: null,
            error: {
                hasError: false,
                errorMessage: null,           
            },
        }
        this.loadPokemon = this.loadPokemon.bind(this);
        
        this.darkTheme = createMuiTheme({
            palette:{
                type: "dark",
            },
        });
        
        this.lightTheme = createMuiTheme({
            palette:{
                type: "light"
            },
        });
    }

    changeTheme = (event) => {
        this.setState({theme : (event.target.checked ? this.darkTheme : this.lightTheme)})
    }
    
    clearError = () => {
        this.setState({
            error: {
                hasError: false, 
                helpertext: null,
            }
        })
    }

    loadPokemon(pokemonName){

        var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName; 
        console.log(url)
        
        fetch(url,
        {
            method:"GET",
            headers:{"origin":"localhost"},
        
        })
        .then(res => {return res.json()})
        .then(resData => {this.setState({
            pokemon: 
                {
                    name: resData["name"], 
                    weight: resData["weight"], 
                    height: resData["height"],
                    images: resData["sprites"],
                }
            }
        )})
        .catch(error => {this.setState({
            error:
                {
                    hasError: true,
                    errorMessage: "Please enter a valid Pokemon",
                }
        })})
        
        // console.log(this.state.pokemon);

    }

    render(){
        return(
            <ThemeProvider theme = {this.state.theme}>
                <CssBaseline>
                    <div>
                        <Switch color = "primary" onChange = {this.changeTheme}/>
                        <PokemonTextfield loadPokemon = {this.loadPokemon} error = {this.state.error} clearError = {this.clearError}/>
                        <PokemonCard pokemon = {this.state.pokemon}/>
                    </div>
                </CssBaseline>
            </ThemeProvider>
        )
    }

}

export default PokemonView;