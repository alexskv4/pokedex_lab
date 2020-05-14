import React, {Component} from 'react'
import Button from '@material-ui/core/Button'


class MainView extends Component{
    constructor(props){
        super(props);
    }


    elephantRoute = () => {
        this.props.history.push("/elephants")
    }
    
    pokemonRoute = () => {
        this.props.history.push("/pokemon")
    }
    
    
    render(){
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.elephantRoute}>Elephants</Button>
                <Button variant="contained" color="secondary" onClick={this.pokemonRoute}>Pokemon</Button>
            </div>


        )


    }

}

export default MainView;
