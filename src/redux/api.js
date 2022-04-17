import axios from 'axios'

const YOUR_APP_ID = "cbf43971"
const YOUR_APP_KEY = "e957c708958035c402653693f84f3d03"

export const getRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
  return await axios.get(url)
}
