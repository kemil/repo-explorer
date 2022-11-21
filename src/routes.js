import asyncComponent from '../../helpers/AsyncFunc'

const home = [
  {
    path: '',
    component: asyncComponent(() => import('./Page/Dashboard'))
  }
]

const routePath = {
    home
}

export default routePath