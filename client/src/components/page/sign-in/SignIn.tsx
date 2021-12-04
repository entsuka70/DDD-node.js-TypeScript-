import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { uiConfig } from 'components/libs/firebase/firebase-ui-config'
// import { firebaseConfig } from '../../libs/firebase/firebase-config';

// firebase.initializeApp(firebaseConfig)

// const config = uiConfig
const SignIn = () => {
  console.log('SignIn')
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn
