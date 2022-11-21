import axios from 'axios'
import history from '../context/history'
import config from '../config'

const AxiosCoreInstance = axios.create({
  baseURL: config.api.host,
  withCredentials: true
})

function disableSite(isDisabled) {
  const paramHeader = {
    headers: {
      'X-Disable-Site': 'true'
    }
  }
  return isDisabled ? paramHeader : undefined
}

AxiosCoreInstance.interceptors.request.use((request) => {
  if (config.useStub) {
    request.baseURL = ''
    request.params = null
    request.url = `/stub/${request.url}.json`
  }
  request.headers.common['X-Site'] = config.app.siteId
  return request
})

AxiosCoreInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth')
      localStorage.removeItem('recoil-persist')
      if (!localStorage.getItem('errorLogin')) {
        localStorage.setItem(
          'errorLogin',
          error.response.data ? error.response.data.error.message : 'Session is expired, please relogin again'
        )
        localStorage.setItem('errorLoginTitle', error.response.data ? error.response.data.message : 'Session')
      }
      if (document.location.pathname !== '/') {
        localStorage.setItem('lastPage', document.location.pathname)
      }
      history.replace('/signin')
    } else {
      return Promise.reject(error)
    }
  }
)

const AxiosAuthInstance = axios.create({
  baseURL: `${config.api.host}/auth`,
  withCredentials: true
})

export default axios
export { AxiosCoreInstance, AxiosAuthInstance, disableSite }
