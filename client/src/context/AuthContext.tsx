import {
  useEffect,
  createContext,
  Dispatch,
  ReactChild,
  useReducer,
} from 'react'
import { firebaseApp } from 'components/libs/firebase/firebase-initialize'
import { getAuth } from 'firebase/auth'

type State = {
  clientId: string | null
  token: string | null
  signInStatus: SignInStatus
}

type SignInStatus = 'signIn' | 'signOut' | 'unknown'

const initialState: State = {
  clientId: null,
  token: null,
  signInStatus: 'signOut',
}

type Payload = {
  clientId: string
  token: string
}

const singIn = 'auth/signIn' as const
const singOut = 'auth/signOut' as const

const dispatchSignInAction = (payload: Payload) => ({
  type: singIn,
  payload,
})

const dispatchSignOutAction = () => ({
  type: singOut,
})

type DispatchAction =
  | ReturnType<typeof dispatchSignInAction>
  | ReturnType<typeof dispatchSignOutAction>

const reducer = (state: State, action: DispatchAction) => {
  switch (action.type) {
    case singIn:
      return {
        ...state,
        clientId: action.payload.clientId,
        token: action.payload.token,
        signInState: 'signIn' as SignInStatus,
      }
    case singOut:
      return {
        ...state,
        initialState,
      }
    default:
      return state
  }
}

export const AuthContext = createContext<State>(initialState)
export const UpdateAuthContext = createContext<Dispatch<DispatchAction>>(
  () => {}
)

const AuthContextProvider = ({ children }: { children: ReactChild }) => {
  const [auth, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const unregisterAuthObserver = getAuth(firebaseApp).onAuthStateChanged(
      async (user) => {
        const clientId = user?.uid
        const token = await user?.getIdToken()

        if (clientId && token) {
          dispatch(dispatchSignInAction({ clientId, token }))
        } else {
          dispatch(dispatchSignOutAction())
        }
      }
    )

    return () => unregisterAuthObserver()
  }, [])

  return (
    <AuthContext.Provider value={auth}>
      <UpdateAuthContext.Provider value={dispatch}>
        {children}
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
