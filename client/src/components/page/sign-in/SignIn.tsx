import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { firebaseApp } from 'components/libs/firebase/firebase-initialize'
import { uiConfig } from 'components/libs/firebase/firebase-ui-config'

const SignIn = () => {
  const { clientId } = useContext(AuthContext)

  if (!clientId) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebaseApp.auth()}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h1>My App</h1>
        <p>
          Welcome {firebaseApp.auth().currentUser?.email}! You are now
          signed-in!
        </p>
        <p>client id : {clientId}</p>
        <button onClick={() => firebaseApp.auth().signOut()}>Sign-out</button>
      </div>
    )
  }
}

export default SignIn
