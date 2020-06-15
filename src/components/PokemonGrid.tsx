import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
    pokemonArr: Array<any>
    // loadPokemon: Function
}


const PokemonGrid: React.FC <PokemonGridProps> = (props) => {


    console.log(props.pokemonArr)
    const pokemonItems = props.pokemonArr.map((pokemon) => 
        <GridListTile key={pokemon.id}>
            <PokemonCard pokemon = {pokemon}/>
        </GridListTile>)
    // console.log(pokemonItems)
    return(
        <GridList cols={3} cellHeight={650}>
            {pokemonItems}
        </GridList>
    )
}

export default PokemonGrid;