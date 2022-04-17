import React, {useState, useEffect} from 'react'
import {
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { getRecipes } from './redux/api'
import './App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}))

export default () => {
  const classes = useStyles()

  const [recipes, setRecipes] = useState({})
  const [query, setQuery] = useState('chicken')

  useEffect(() => {(
    async () => {
      const recipesFromQuery = await getRecipes(query)
      setRecipes(recipesFromQuery)
    }
	)()}, [query])
  
  return (
    <div className="App">
      <button onClick={() => { if (query === 'chicken') { setQuery('rice') } else { setQuery('chicken') } }}>change query</button>
      <button onClick={() => console.log(recipes)}>recipes</button>
      <h2>Recipe App</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" />
        <Button variant="contained" color="primary" style={{ width: "80px", height: "50px" }}>Search</Button>
      </form>
    </div>
  )
}
