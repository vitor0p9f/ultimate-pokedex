import Axios from 'axios'

const axiosConfig = {
  baseURL: 'https://pokeapi.co/api/v2/'
}

const AxiosPokeAPI = Axios.create(axiosConfig)

export default AxiosPokeAPI
