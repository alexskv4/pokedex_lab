import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
    pokemonArr: Array<Object>
    // loadPokemon: Function
}


const PokemonGrid: React.FC <PokemonGridProps> = (props) => {

    const pokemonItems = props.pokemonArr.map((pokemon, index) => 
        <GridListTile key={index}>
            <PokemonCard pokemon = {pokemon}/>
        </GridListTile>)

    return(
        <GridList cols={3} cellHeight={450}>
            {pokemonItems}
        </GridList>
    )
}

export default PokemonGrid;