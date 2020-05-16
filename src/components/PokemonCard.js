import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class PokemonCard extends Component{
    constructor(props){
        super(props);
        this.pokemonImage = null
        this.imageSelection = null
    }
    

    render(){
        if (this.props.pokemon){
            this.pokemonImage = this.props.pokemon.images.front_default
            console.log(this.pokemonImage)
            return(
                <Container maxWidth = "xs">
                    <Card>
                        
                        <CardActions>
                            <Select value = {this.imageSelection} onChange = {this.pokemonImage = this.imageSelection}>
                                <MenuItem value = ".front_default">regular front</MenuItem>
                                <MenuItem value = ".back_default">regular back</MenuItem>
                            </Select>
                        </CardActions>
                        
                        <CardMedia
                            component = "img"
                            alt = "pokemon image"
                            height = "100%"
                            image = {this.pokemonImage}
                            title = "pokemon image"
                        />
                        <CardContent>
                            <p>Name: {this.props.pokemon.name}</p>
                            <p>Weight: {this.props.pokemon.weight}</p>
                            <p>Height: {this.props.pokemon.height}</p>
                        </CardContent>
                    </Card>
                </Container>
            )
        }
        return null;
    }
}


export default PokemonCard;