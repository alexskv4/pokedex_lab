import React, {useState, useEffect} from 'react';
import ElephantCard from './ElephantCard';
import { render } from '@testing-library/react';
import ElephantGrid from './ElephantGrid'

function ElephantView(props) {
    // constructor(props){

    //     super(props);
    //     this.state = {
    //         elephants: [],
    //     };
    //     //this.loadElephant = this.loadElephant.bind(this);
    // }
    const [elephants, setElephants] = useState([]);

    var elephantArr = [];
    
    var loadElephant = (id, e) => {

        console.log(id, e);
        
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
                elephantArr.push(resData[0]);
                setElephants([...elephantArr]);
            }
            else{ 
                var data = [...elephants]
                data[id] = resData[0]
                setElephants(data)
            }
           
         

        });
    }
    
    
    useEffect(() => {
        for(var i = 0; i < 9; i++){
            loadElephant();
            
        } 
    }, []);


    return(

        <ElephantGrid elephants = {elephants} loadElephant = {loadElephant}/>

    );           


}

export default ElephantView;