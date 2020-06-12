import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { sizing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';

interface ElephantCardProps {
    elephantData: any
    loadElephant: Function
    id: Number
}


const ElephantCard: React.FC <ElephantCardProps> = (props) => {
       
    return(
        <Container maxWidth='xs'>
            <Card>
                    <CardMedia
                        component="img"
                        alt="elephant image"
                        height="150"
                        image={props.elephantData.image}
                        title="elephant image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.elephantData.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Species: {props.elephantData.species}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Sex: {props.elephantData.sex}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Fictional: {props.elephantData.fictional}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">   
                            Date of birth: {props.elephantData.dob}
                        </Typography>
                    </CardContent>
    
                    <CardActions>
                        <IconButton onClick={props.loadElephant.bind(ElephantCard, props.id)}>
                            <ReplayIcon/>
                        </IconButton>
                    </CardActions>
                
            </Card>
        </Container>
    )       
}


export default ElephantCard;
