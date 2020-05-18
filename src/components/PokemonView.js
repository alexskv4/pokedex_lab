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
            darkMode: false,
            error: {
                hasError: false,
                errorMessage: null,           
            },
        }
        this.loadPokemon = this.loadPokemon.bind(this);
        
        this.theme = createMuiTheme({
            palette:{
                type: this.darkMode ? "dark" : "light",
            },
        });       
    }

    changeTheme = event => {
        if (event.target.checked == false){
            this.setState({
                darkMode: true,
            })
        }
        else {
            this.setState({
                darkMode: false,
        })}      
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
            <ThemeProvider theme = {this.theme}>
                <CssBaseline>
                    <div>
                        <Switch checked = {this.state.darkMode} onChange = {this.changeTheme}/>
                        <PokemonTextfield loadPokemon = {this.loadPokemon} error = {this.state.error} clearError = {this.clearError}/>
                        <PokemonCard pokemon = {this.state.pokemon}/>
                    </div>
                </CssBaseline>
            </ThemeProvider>
        )
    }

}

export default PokemonView;