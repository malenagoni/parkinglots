import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';    
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '50%',
      marginBottom:'0px',
      paddingBottom: '0px'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom:'0px'
    },
    content: {
      flex: '1 0 auto',
      marginBottom:'0px'
    },
    cover: {
      width: 151,
      
    },
    button: {
        height: '30px'
    }
  }));

  let i = 0

export const BusinessCard = ({image, address, rating, score, reviews, link}) => {

    i++
  // let score = ( reviews * ratingStars ) / (reviews + 1)
  // console.log(score)
  const classes = useStyles();

    return (
        <div>
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                component='img'
                src={image}
                alt=''
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">{address}</Typography>
                    <Box component="fieldset" mb={3} borderColor="transparent"> 
                        <Rating
                        key={i}
                        name="customized-empty"
                        defaultValue={rating}
                        precision={0.1}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        readOnly
                        size='large'
                        />
                    </Box>
                </CardContent>
                <Typography color="textSecondary" component="h3" variant="h4">{reviews}</Typography>
                <Typography variant="subtitle1" color="textSecondary">Reviews</Typography>
                <Typography color="textSecondary" component="h3" variant="h4">{score}</Typography>
                <Typography variant="subtitle1" color="textSecondary">SCORE</Typography>
                <Button variant="contained" color="primary" href={link} className={classes.button}>
                    Link
                </Button>
            </div>
        </Card>
        </div>
    )
}
