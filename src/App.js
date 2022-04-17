import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import * as types from './redux/actionTypes'
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
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  const { recipes } = useSelector(state => state.data)

  const updateSearch = () => {
    setQuery(search)
    setSearch('')
  }

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch({type : types.FETCH_RECIPE_START, payload: query })
  }, [query])
  
  return (
    <div className="App">
      <h2>Recipe App</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" variant="outlined" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" color="primary" style={{ width: "80px", height: "50px" }} onClick={updateSearch}>Search</Button>
        {recipes && recipes.hits && recipes.hits.map((item) => (
          <h4>{item.recipe.label}</h4>
        ))}
      </form>
    </div>
  )
}
