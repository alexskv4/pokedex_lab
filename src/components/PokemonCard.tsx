import React, { useState, useEffect, useRef } from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';

interface PokemonCardProps {
    pokemon: {
        images?: any,
        name?: string,
        weight?: string,
        height?: string,
        abilities?: string,
    },

}

const PokemonCard: React.FC <PokemonCardProps> = (props) => {

    const [pokemonSelected, setPokemonSelected] = useState({
        image: "",
        selectorText: "front_default",
    })
    
    const prevPokemonRef = useRef(props.pokemon);

    var handleOnChange = (event: any) => {
        setPokemonSelected({
                image : props.pokemon.images[event.target.value],
                selectorText : event.target.value,
        });
    }

    useEffect(() => {
        if (props.pokemon != prevPokemonRef.current){
            console.log(props.pokemon)
            console.log(prevPokemonRef.current)
            setPokemonSelected(
                {
                    image : props.pokemon.images.front_default,
                    selectorText : "front_default",
                }
            )
        }
    }, [props.pokemon]);

    if (props.pokemon.name){
        
        let selectValuesArray = [];
        for(let i in props.pokemon.images)
            if (props.pokemon.images[i]) {
                selectValuesArray.push(i);
            }
        // let selectValuesArray = Object.keys(props.pokemon.images);

        const pokemonSelectValues = selectValuesArray.map((v: any) => 
            <MenuItem value = {v}> {v} </MenuItem>
        );

        return(
            <Container maxWidth = "xs">
                <Card>
                    <CardActions>
                        <Select onChange = {handleOnChange} value = {pokemonSelected.selectorText} defaultValue = "front_default" variant = "outlined">
                                {pokemonSelectValues}
                        </Select>
                    </CardActions>
                    
                    <CardMedia
                        component = "img"
                        alt = "pokemon image"
                        height = "100%"
                        image = {pokemonSelected.image}
                        title = "pokemon image"
                    />
                    <CardContent>
                        <p>Name: {props.pokemon.name}</p>
                        <p>Weight: {props.pokemon.weight}</p>
                        <p>Height: {props.pokemon.height}</p>
                        <p>Abilities: {props.pokemon.abilities}</p>
                    </CardContent>
                </Card>
            </Container>
        )
    }
    return null;
}


export default PokemonCard;