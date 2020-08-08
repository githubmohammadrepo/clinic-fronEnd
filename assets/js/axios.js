import axios from 'axios'

const myaxios = axios.create({
  baseURL: "http://localhost:80/api",
})
myaxios.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log(error)
  }
)

export default myaxios;
