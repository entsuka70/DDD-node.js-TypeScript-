import { getUserLists } from 'api/requests/user'
import { AuthContext } from 'contexts/AuthContext'
import { useContext } from 'react'

const Home = (): JSX.Element => {
  const { token } = useContext(AuthContext)

  return (
    <div>
      <h1>リクエストホーム</h1>
      <div>
        <h2>ユーザーリスト</h2>
        <button onClick={() => getUserLists(token as string)}>
          ユーザーリスト取得
        </button>
        <div>
          <ul>
            <li>ユーザーホゲ</li>
            <li>ユーザーフガ</li>
            <li>ユーザーホルツ</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>ペアリスト</h2>
        <button>ペアリスト取得</button>
        <div>
          <ul>
            <li>ペアホゲ</li>
            <li>ペアフガ</li>
            <li>ペアホルツ</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>チームリスト</h2>
        <button>チームリスト取得</button>
        <div>
          <ul>
            <li>チームはありません</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
