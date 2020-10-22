import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://websitcosimg.ygjie.icu/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  })

export default instance