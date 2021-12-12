import client from 'api/clients'
import { AxiosRequestConfig } from 'axios'

const BASE_PATH = '/user'

type UserListsResponse = {
  id: string
  pair_id: string
  team_id: string
  user_name: string
  email: string
  status: number
}[]

const getUserLists = async (token: string): Promise<UserListsResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await client.get(`${BASE_PATH}`, config)

  if (data.length > 0) {
    return data
  }

  throw new Error('Can not get user lists')
}

export { getUserLists }
