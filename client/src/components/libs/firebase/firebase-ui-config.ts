import firebase from "firebase/compat/app"

export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function() {
      console.log('success auth')
      return true
    },
    uiShown: function() {
      document.getElementById('loader')!.style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
}
