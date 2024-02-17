import { auth, db } from '@/lib/firebase';
import { User } from '@/types/type';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

//ユニオン型で定義
type UserContextType = User | null | undefined;

//コンテキストオブジェクトを作成
const AuthContext = createContext<UserContextType>(undefined);

//プロバイダーを作成
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  //認証状態が変化したときに呼ばれる
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, `users/${firebaseUser.uid}`); //ログインしているユーザーの情報を格納
        const snap = await getDoc(ref); //ドキュメントを取得

        //ユーザーがドキュメントに存在しているかチェック
        if (snap.exists()) {
          const appUser = (await getDoc(ref)).data() as User;
          setUser(appUser);
        } else {
          //存在しない場合は新しくユーザー情報をFirestoreに保存する
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName!,
          };

          setDoc(ref, appUser).then(() => {
            setUser(appUser);
          });
        }
      } else {
        setUser(null);
      }

      return unsubscribe;
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>; //子要素にuserを渡す
};

export const useAuth = () => useContext(AuthContext);
