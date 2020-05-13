import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { sizing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';


class ElephantCard extends Component{
    
    
    render(){
        // var {isLoaded, Elephant}=this.state;

        // if (!isLoaded){
        //     return <div>Loading...</div>
        // }

        // else{
            return(
                <Container maxWidth='xs'>
                    <Card>
                            <CardMedia
                                component="img"
                                alt="elephant image"
                                height="150"
                                image={this.props.elephantData.image}
                                title="elephant image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.props.elephantData.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Species: {this.props.elephantData.species}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Sex: {this.props.elephantData.sex}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Fictional: {this.props.elephantData.fictional}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">   
                                    Date of birth: {this.props.elephantData.dob}
                                </Typography>
                            </CardContent>
           
                            <CardActions>
                                <IconButton onClick={this.props.loadElephant.bind(this, this.props.id)}>
                                    <ReplayIcon/>
                                </IconButton>
                            </CardActions>
                      
                    </Card>
                </Container>
            )
        }
    }


export default ElephantCard;
