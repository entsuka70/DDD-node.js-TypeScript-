import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-auth";

interface SignInProps {
  email: string
  password: string
}

export const signIn = async ({email, password}: SignInProps): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
}