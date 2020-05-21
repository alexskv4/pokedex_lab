import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';

class PokemonCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonSelected:{
                image : null,
                selectorText : "front_default",

            }
        };
    }
    
    handleOnChange = event => {
        this.setState({
            pokemonSelected: {
                image : this.props.pokemon.images[event.target.value],
                selectorText : event.target.value,
            }

        });
         
        //console.log(this.state.pokemonSelected.image)
    }


    componentDidUpdate(prevProps) {
        if (this.props.pokemon != prevProps.pokemon){
            this.setState({
                pokemonSelected : {
                    image : this.props.pokemon.images.front_default,
                    selectorText : "front_default",
                }
            });
        }   
    }

    render(){
        if (this.props.pokemon){
            return(
                <Container maxWidth = "xs">
                    <Card>
                        
                        <CardActions>
                            <Select onChange = {this.handleOnChange} value = {this.state.pokemonSelected.selectorText} defaultValue = "front_default" variant = "outlined">
                                <MenuItem value = "front_default">Regular front</MenuItem>
                                <MenuItem value = "back_default">Regular back</MenuItem>
                            </Select>
                        </CardActions>
                        
                        <CardMedia
                            component = "img"
                            alt = "pokemon image"
                            height = "100%"
                            image = {this.state.pokemonSelected.image}
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