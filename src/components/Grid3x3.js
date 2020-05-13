import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid'
import ElephantCard from './ElephantCard'



class Grid3x3 extends Component{
    render(){
        return(
            <Grid container direction='column' alignItems='center'>
                <Grid item>
                    <Grid container>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                        <Grid item><ElephantCard elephantData = {this.props.elephantData} loadElephant = {this.props.loadElephant}/></Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


export default Grid3x3;