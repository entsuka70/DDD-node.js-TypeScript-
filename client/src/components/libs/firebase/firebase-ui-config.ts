import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function () {
      console.log('success auth')
      return true
    },
    uiShown: function () {
      const element = document.getElementById('loader')
      if (element) {
        element.style.display = 'none'
      }
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
}
