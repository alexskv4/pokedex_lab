import React, {useRef, MouseEvent, KeyboardEvent} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';


interface PokemonTextFieldProps {
    clearError: Function,
    loadPokemon: Function,
    error: any,
}

const StyledButton = styled(Button) ({
    background: 'linear-gradient(45deg, #FF0000 30%, #FFFFFF 50%)',
    color: 'black',
    fontWeight: 'bolder',
});



const PokemonTextfield: React.FC <PokemonTextFieldProps> = (props) => {
    const searchInputRef = useRef <HTMLInputElement>();

    let handleOnChange = () => {
        props.clearError()
    }

    let handleOnClick = (event: MouseEvent) => {
        event.preventDefault();
        props.loadPokemon(searchInputRef.current?.value)
    }

    let keyPress = (event: KeyboardEvent) => {
        if(event.keyCode == 13){
            props.loadPokemon(searchInputRef.current?.value)
        }
    }

    return(
        <div>
            <Grid container spacing = {2} alignItems = "center">
                <Grid item>
                    <TextField
                        size = 'small'
                        color = "secondary"
                        onChange = {handleOnChange}
                        inputRef={searchInputRef} 
                        error = {props.error.hasError}
                        id = "filled-basic" 
                        label = "Pokemon name" 
                        variant = "outlined"
                        helperText = {props.error.errorMessage}
                        onKeyDown = {keyPress}
                    />
                </Grid>
                <Grid item><StyledButton onClick={handleOnClick} variant = "contained" color = "primary">Search</StyledButton></Grid>
            </Grid>
        </div>
    )
}

export default PokemonTextfield;