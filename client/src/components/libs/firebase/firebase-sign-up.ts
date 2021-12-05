import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase-auth'

interface SingUpProps {
  email: string
  password: string
}

export const signUp = async ({
  email,
  password,
}: SingUpProps): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password)
}
