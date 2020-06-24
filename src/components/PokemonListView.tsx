import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import PokemonGrid from './PokemonGrid';

const PokemonListView: React.FC = () => {
    
    const [pokemonList, setPokemonList] = useState(Array<Object>());

    let loadPokemons = () => {
        let url = "https://pokeapi.co/api/v2/pokemon/"

        fetch(url, 
            {
                method:"GET",
                headers:{"origin":"localhost"},
            })
            .then(res => {return res.json()})
            .then(resData => {
                setPokemonList(resData.results[0])
            })
    }

    return(
        <div>
            <Button onClick = {loadPokemons}> load </Button>
            {pokemonList}
        </div>
    )
}

export default PokemonListView;