import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://websitearticle.ygjie.icu/',
    timeout: 5000,
  })

export default instance