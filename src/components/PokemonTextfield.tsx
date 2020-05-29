import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

interface PokemonTextFieldProps {
    clearError: Function,
    loadPokemon: Function,
    error: any,
}

const PokemonTextfield: React.FC <PokemonTextFieldProps> = (props) => {

    const searchInputRef = useRef <HTMLInputElement>();

    let handleOnClick = (event: any) => {
        event.preventDefault();
        props.loadPokemon(searchInputRef.current!.value)
    }

    let keyPress = (event: any) => {
        if(event.keyCode == 13){
            props.loadPokemon(searchInputRef.current!.value)
        }
    }

    return(
        <div>
            <Grid container spacing = {2} alignItems = "center">
                <Grid item>
                    <TextField
                        inputRef={searchInputRef} 
                        error = {props.error.hasError}
                        id = "filled-basic" 
                        label = "Pokemon name" 
                        variant = "outlined"
                        helperText = {props.error.errorMessage}
                        onKeyDown = {keyPress}
                    />
                </Grid>
                <Grid item><Button onClick={handleOnClick} variant = "contained" color = "primary">Search</Button></Grid>
            </Grid>
        </div>
    )
}

export default PokemonTextfield;