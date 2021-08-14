import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AuthContext } from '../Context/AuthContext'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        padding: "20px",
        margin: "20px",
        borderRadius: "20px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        borderRadius: "20px"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard() {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.name[0].toUpperCase()}{user.name[1].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                    </IconButton>
                }
                title={user.name.toUpperCase()}
                subheader={user.createdAt}
            />
            <CardMedia
                className={classes.media}
                image={user.picture}
                title="Paella dish"
            />
            <CardContent style={{ marginTop: "20px" }}>
                <Typography style={{ fontSize: "20px" }} variant="body2" color="#ffffff" component="h1">
                    Location: {user.location.toUpperCase()}
                </Typography>
                <Typography style={{ fontSize: "20px" }} variant="body2" color="#ffffff" component="h1">
                    Phone Number: {user.phone.toUpperCase()}
                </Typography>
                <Typography style={{ fontSize: "20px" }} variant="body2" color="#ffffff" component="h1">
                    Email: {user.email.toUpperCase()}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    {/* <FavoriteIcon /> */}
                </IconButton>
            </CardActions>
        </Card>
    );
}
