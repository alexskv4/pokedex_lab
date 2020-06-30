import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PokemonCard from './PokemonCard';
import shortid from 'shortid';

interface PokemonGridProps {
    pokemonArr: Array<any>
    removePokemon: Function
}


const PokemonGrid: React.FC <PokemonGridProps> = (props) => {


    console.log(props.pokemonArr)
    const pokemonItems = props.pokemonArr.map((pokemon) => 
        <GridListTile key={pokemon.uuid}>
            <PokemonCard removePokemon = {props.removePokemon} pokemon = {pokemon}/>
        </GridListTile>)
    // console.log(pokemonItems)
    return(
        <GridList cols={3} cellHeight={650}>
            {pokemonItems}
        </GridList>
    )
}

export default PokemonGrid;