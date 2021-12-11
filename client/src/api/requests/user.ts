import client from 'api/clients'

const BASE_PATH = '/user'

type UserListsResponse = {
  id: string
  pair_id: string
  team_id: string
  user_name: string
  email: string
  status: number
}[]

const getUserLists = async (): Promise<UserListsResponse> => {
  const { data } = await client.get(`${BASE_PATH}`)

  if (data.length > 0) {
    return data
  }

  throw new Error('Can not get user lists')
}

export { getUserLists }
