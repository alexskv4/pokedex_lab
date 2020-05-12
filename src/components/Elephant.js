import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import { sizing } from '@material-ui/system'

class Elephant extends Component {
    constructor(props){

        super(props);
        this.state = {
            Elephant: {},
            isLoaded: false,
        };
    }
    componentDidMount(){

        fetch('https://cors-anywhere.herokuapp.com/https://elephant-api.herokuapp.com/elephants/random', 
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
                    isLoaded: true,
                    Elephant: resData[0],

                })              
            });


            
    }
    
    render(){
        var {isLoaded, Elephant}=this.state;

        if (!isLoaded){
            return <div>Loading...</div>
        }

        else{
            return (
                <Box width="50%" height="50%">
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="elephant image"
                                height="500"
                                image={this.state.Elephant.image}
                                title="elephant image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.Elephant.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <p>Species: {this.state.Elephant.species}</p>
                                    <p>Sex: {this.state.Elephant.sex}</p>
                                    <p>Fictional: {this.state.Elephant.fictional}</p>
                                    <p>Date of birth: {this.state.Elephant.dob}</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            );
        }
    }
}

export default Elephant;