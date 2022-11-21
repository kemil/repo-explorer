import Axios from 'axios'
import { github_access_token } from './env'

const api = Axios.create({
  baseURL: 'https://api.github.com',
})

if (github_access_token) {
  api.defaults.headers.common.Authorization = github_access_token
}

const getGithubUser = async (search) => {
  const result = await api.get(`/search/users?q=${search}`)
  const users = []
  result?.data?.items.forEach((data, i) => {
    const user =  { ...data, key: i.toString() }
    users.push(user)
  })

  return users
}

const getGithubUserRepos = async (name) => {
  const result = await api.get(`/users/${name}/repos`)
  const repos = []
  result?.data?.forEach((data, i) => {
    const repo = { ...data, key: i.toString() }
    repos.push(repo)
  })

  return repos
}

export { getGithubUser, getGithubUserRepos }
