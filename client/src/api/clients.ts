import axios from 'axios'

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_SERVER_URL}`,
  timeout: 5000,
  headers: {
    'Content-type': 'application/json',
  },
})

export default client
