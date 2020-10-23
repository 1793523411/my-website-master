import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://websitcosimg.ygjie.icu/',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })

export default instance