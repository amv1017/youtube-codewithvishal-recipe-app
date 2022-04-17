import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import * as types from './redux/actionTypes'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core/'
import {
  DirectionsRun,
  ExpandMore,
  Favorite,
  MoreVert,
  Share,
} from '@material-ui/icons'
import { red } from '@material-ui/core/colors'
import './App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}))

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}))

const cardStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

export default () => {
  const classes = useStyles()
  const gridClasses = gridStyles()
  const cardClasses = cardStyles()
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  const [expanded, setExpanded] = useState(false)
  const [cardValue, setCardValue] = useState('')

  const { recipes } = useSelector(state => state.data)

  const updateSearch = () => {
    setQuery(search)
    setSearch('')
  }

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch({type : types.FETCH_RECIPE_START, payload: query })
  }, [query])

  const handleExpandClick = (index) => {
    setExpanded(!expanded)
    setCardValue(index)
  }
  
  return (
    <div className="App">
      <h2>Recipe App</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" color="primary" style={{ width: "80px", height: "50px" }} onClick={updateSearch}>Search</Button>
      </form>
      <Grid container className={gridClasses.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {recipes && recipes.hits && recipes.hits.map((item, index) => (
              <Grid key={index} item>
                <Card className={cardClasses.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={cardClasses.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVert />
                      </IconButton>
                    }
                    title={item.recipe.label}
                    subheader={
                      <span>
                        <DirectionsRun />
                        {item.recipe.calories}
                      </span>
                    }
                  />
                  <CardMedia
                    className={cardClasses.media}
                    image={item.recipe.image}
                    title={item.recipe.label}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    ></Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                    <IconButton aria-label="share">
                      <Share />
                    </IconButton>
                    <IconButton
                      aria-label="show more"
                      aria-expanded={expanded}
                      className={clsx(cardClasses.expand, {
                        [cardClasses.expandOpen]: expanded,
                      })}
                      onClick={() => handleExpandClick(index)}
                    >
                      <ExpandMore />
                    </IconButton>
                  </CardActions>
                  <Collapse in={index === cardValue && expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph variant="h6">Ingredients:</Typography>
                      {item.recipe.ingredients.map((item) => (
                        <Typography paragraph>{item.text}</Typography>
                      ))}
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
