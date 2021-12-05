import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { uiConfig } from 'components/libs/firebase/firebase-ui-config'
import { firebaseConfig } from 'components/libs/firebase/firebase-config'

firebase.initializeApp(firebaseConfig)
const SignIn = () => {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default SignIn
