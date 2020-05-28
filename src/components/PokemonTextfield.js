import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
class PokemonTextfield extends Component{
    constructor(props) {
        super(props);
        this.searchText = "";
      }
     
    handleOnChange = event => {
        console.log(event.target.value);
        this.searchText = event.target.value;
        this.props.clearError()
    };

    handleOnClick = event => {
        event.preventDefault();
        this.props.loadPokemon(this.searchText)
        console.log(this.searchText)
    }

    keyPress = event => {
        if(event.keyCode == 13){
            this.props.loadPokemon(this.searchText)
        }
    }

    render() {
        return(
            <div>
                <Grid container spacing = {2} alignItems = "center">
                    <Grid item><TextField 
                        error = {this.props.error.hasError}
                        id = "filled-basic" 
                        label = "Pokemon name" 
                        variant = "outlined" 
                        onChange = {this.handleOnChange} 
                        helperText = {this.props.error.errorMessage}
                        onKeyDown = {this.keyPress}
                    /></Grid>
                    <Grid item><Button onClick={this.handleOnClick} variant = "contained" color = "primary">Search</Button></Grid>
                </Grid>
            </div>
        )
    }


}

export default PokemonTextfield;