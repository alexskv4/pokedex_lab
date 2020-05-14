import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'

class PokemonView extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemon: [],
        }
    }

    loadPokemon(){

        fetch("https://api.codetabs.com/v1/proxy?quest=https://pokeapi.co/api/v2/pokemon/pikachu/",
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
        
        console.log(this.state.pokemon);

    }

    componentDidMount(){
        this.loadPokemon();
    }

    render(){

        if (this.state.pokemon[0] == null){
            return(
                <TextField id="filled-basic" label="Filled" variant="filled" />
            )
        }


        else {
            return(
                <div>
                    <h1>Name: {this.state.pokemon.name}</h1>
                    <h1>Weight: {this.state.pokemon.weight}</h1>
                    <h1>Height: {this.state.pokemon.Height}</h1>
                </div>
            );
        }
    }

}

export default PokemonView;