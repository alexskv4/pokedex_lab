import React, {Component} from 'react';
import ElephantCard from './ElephantCard';
import { render } from '@testing-library/react';
import Grid3x3 from './Grid3x3'

class ElephantView extends Component{
    constructor(props){

        super(props);
        this.state = {
            elephant: {},
        };
        this.loadElephant = this.loadElephant.bind(this);
    }
    
    loadElephant(){

        fetch('https://api.codetabs.com/v1/proxy?quest=https://elephant-api.herokuapp.com/elephants/random', 
        {
            method:'GET',
            headers:{
                'origin':'localhost'
            },
        
        })
        .then(res => {
            return res.json()
        })
        .then(resData => {

            console.log(resData[0]);
            this.setState({
                elephant: resData[0],

            })              
        });
    }
    
    
    componentDidMount(){
        this.loadElephant();
    }

    render(){
        return(

            <Grid3x3 elephantData = {this.state.elephant} loadElephant = {this.loadElephant}/>

        );           
    }

}

export default ElephantView;