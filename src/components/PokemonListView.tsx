import React from 'react';


const PokemonListView: React.FC = () => {
    
    var loadPokemons = () => {
        let url = "https://pokeapi.co/api/v2/pokemon/"

        fetch(url, 
            {
                method:"GET",
                headers:{"origin":"localhost"},
            })
            .then(res => {return res.json()})
    }

    return(
        <div>
            hello
        </div>
    )
}

export default PokemonListView;