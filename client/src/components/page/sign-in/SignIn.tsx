import type { NextPage } from 'next'

const SignInPage: NextPage = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <div>
        <label htmlFor="email">
          メールアドレス
          <input id="email" type="text" />
        </label>
        <label htmlFor="password">
          パスワード
          <input id="password" type="password" />
        </label>
      </div>
      <button>ログイン</button>
    </div>
  )
}

export default SignInPage