import React, {Component} from 'react';
import ElephantCard from './ElephantCard';
import { render } from '@testing-library/react';
import ElephantGrid from './ElephantGrid'

class ElephantView extends Component{
    constructor(props){

        super(props);
        this.state = {
            elephants: [],
        };
        this.loadElephant = this.loadElephant.bind(this);
    }
    
    loadElephant(id, e){

        // console.log(id, e);
        
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

            if (id == null){
                this.setState({
                    elephants: [...this.state.elephants, resData[0]]
                }) 
            }
            else{
          
                var data = [...this.state.elephants]
                data[id] = resData[0]

                this.setState({                    
                        elephants: data
                    })

            }

            // console.log(this.state.elephants);

        });
    }
    
    
    componentDidMount(){
        for(var i = 0; i < 9; i++){
            this.loadElephant();
        }
    }

    render(){
        return(

            <ElephantGrid elephants = {this.state.elephants} loadElephant = {this.loadElephant}/>

        );           
    }

}

export default ElephantView;