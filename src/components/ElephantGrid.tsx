import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ElephantCard from './ElephantCard'

interface ElephantGridProps {
    elephants: Array<Object>
    loadElephant: Function
}

const ElephantGrid: React.FC <ElephantGridProps> = (props) => {
      
    const elephantItems = props.elephants.map((elephant, index) => 
        <GridListTile key={index}>
            <ElephantCard id = {index} elephantData = {elephant} loadElephant = {props.loadElephant}/>
        </GridListTile>
    )

    return(
        <GridList cols={3} cellHeight={450}>
            {elephantItems}
        </GridList>
    )
}


export default ElephantGrid;