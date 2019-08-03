import axios from 'axios'
import _ from 'lodash'

const NUM_REPOS_TO_ANALYZE = 20
// @ts-ignore
const QUERY_PARAMS = {
  params: {
    page: 1,
    page_size: NUM_REPOS_TO_ANALYZE,
  },
}

// @ts-ignore
interface QueryOptions {
  username: string
}

interface RepoFields {
  description: string
  last_updated: string
  name: string
  pull_count: number
  star_count: number
}

// @ts-ignore
interface DHStatsReponse {
  topRepos: RepoFields[]
  totalPulls: number
}

export const queryRepos = async (): Promise<any> => {
  // Promise<DHStatsReponse> => {
  const response = await axios.get(
    'https://rrrr413d15.execute-api.us-east-1.amazonaws.com/dev/users/topRepos',
  )
  return _.take(response.data.topRepos, 20)
  // const topRepos: RepoFields[] = _.flow(
  //   fp.get('data.results'),
  //   fp.map(
  //     fp.pick([
  //       'description',
  //       'last_updated',
  //       'name',
  //       'pull_count',
  //       'star_count',
  //     ]),
  //   ),
  // )(repos) as RepoFields[]
  // const totalPulls: number = _.sumBy(topRepos, 'pull_count')

  // return
  // return { topRepos, totalPulls }
}

// queryRepos({ username: USERNAME })
//   .then(({ topRepos, totalPulls }) => {
//     console.log({ topRepos, totalPulls })
//   })
//   .catch(console.error)
