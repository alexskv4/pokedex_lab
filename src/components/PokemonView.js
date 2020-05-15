import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import PokemonTextfield from './PokemonTextfield'
import PokemonCard from './PokemonCard'

class PokemonView extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemon: null,
            error: {
                hasError: false,
                errorMessage: null,           
            },
        }
        this.loadPokemon = this.loadPokemon.bind(this);
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
            <div>
                <PokemonTextfield loadPokemon = {this.loadPokemon} error = {this.state.error} clearError = {this.clearError}/>
                <PokemonCard pokemon = {this.state.pokemon}/>
            </div>
        )
    }

}

export default PokemonView;