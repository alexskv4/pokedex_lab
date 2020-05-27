import React, {useState, useEffect} from 'react';
import ElephantCard from './ElephantCard';
import { render } from '@testing-library/react';
import ElephantGrid from './ElephantGrid'



const ElephantView: React.FC = () => {

    const [elephants, setElephants] = useState(Array<Object>([]));

    var elephantArr: Array<object> =  [];
    
    var loadElephant = (id:number | null, e:any) => {

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
                var data: object[] = [...elephants]
                data[id] = resData[0]
                setElephants(data)
            }
           
         

        });
    }
    
    
    useEffect(() => {
        for(var i = 0; i < 9; i++){
            loadElephant(null, null);
            
        } 
    }, []);


    return(

        <ElephantGrid elephants = {elephants} loadElephant = {loadElephant}/>

    );           


}

export default ElephantView;