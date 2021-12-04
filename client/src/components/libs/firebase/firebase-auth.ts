import { getAuth } from "firebase/auth"
import { firebaseApp } from "./firebase-initialize"

export const auth = getAuth(firebaseApp)