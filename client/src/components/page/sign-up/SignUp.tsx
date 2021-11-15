import type { NextPage } from 'next'

const SignUpPage: NextPage = () => {
  return (
    <div>
      <h1>新規登録</h1>
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
      <button>新規登録</button>
    </div>
  )
}

export default SignUpPage