import React, { Component } from 'react';

class PokemonCard extends Component{

    render(){
        if (this.props.pokemon){
            return(
                <div>
                    <h1>Name: {this.props.pokemon.name}</h1>
                    <h1>Weight: {this.props.pokemon.weight}</h1>
                    <h1>Height: {this.props.pokemon.height}</h1>
                </div>
            )
        }
        return null;
    }
}


export default PokemonCard;