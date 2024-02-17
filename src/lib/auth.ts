import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

//新規ユーザーを作成
export const createNewUser = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// メールアドレスとパスワードでログインするメソッド
export const loginWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

//ログアウト用メソッド
export const logout = (): Promise<void> => {
  return signOut(auth);
};
