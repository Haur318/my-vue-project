import axios from 'axios'

const devMode = 'http://localhost:5173/my-vue-project/'
const prodMode = 'https://haur318.github.io/my-vue-api/'

const axiosClient = axios.create({
  // baseURL: 'https://www.themealdb.com/api/json/v1/1/'
  baseURL: import.meta.env.MODE == 'development' ? devMode : prodMode
})

export default axiosClient
