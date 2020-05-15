import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
                <TextField 
                    error = {this.props.error.hasError}
                    id = "filled-basic" 
                    label = "Pokemon name" 
                    variant = "filled" 
                    onChange = {this.handleOnChange} 
                    helperText = {this.props.error.errorMessage}
                    onKeyDown = {this.keyPress}
                />
                <Button onClick={this.handleOnClick}>Search</Button>
            </div>
        )
    }


}

export default PokemonTextfield;