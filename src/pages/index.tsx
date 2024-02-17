import { useAuth } from '@/context/auth';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LoginForm } from '@/components/loginForm';
import { SignUpForm } from '@/components/SignUpForm';
import styles from '@/styles/Home.module.css';
import { Profile } from '@/components/Profile';
export default function Home() {
  const user = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      email: string;
      icon: string;
      birthDay: string;
      sex: string;
    }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // ログインユーザーのUIDを取得
        const userUID = user?.id || '';

        // ログインユーザーのデータを取得するクエリ
        const querySnapshot = await getDocs(
          query(collection(db, 'newTest'), where('uid', '==', userUID))
        );

        const userArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          icon: doc.data().icon,
          birthDay: doc.data().birthDay,
          sex: doc.data().sex,
        }));

        setData(userArray);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [user]); // userが変更されたときにgetDataを呼び出す

  return (
    <div>
      {/* ログイン前の画面 */}
      {user === null && (
        <div>
          {isLogin ? (
            <div className={styles.main}>
              <h2 className={styles.title}>こんにちは</h2>
              <LoginForm />
              <button
                className={styles.changeButton}
                onClick={() => setIsLogin(false)}
              >
                新規登録する
              </button>
            </div>
          ) : (
            <div className={styles.main}>
              <h2 className={styles.title}>はじめまして</h2>
              <SignUpForm />
              <button
                className={styles.changeButton}
                onClick={() => setIsLogin(true)}
              >
                ログインする
              </button>
            </div>
          )}
        </div>
      )}
      {/* ログイン後の画面 */}
      {user && (
        <div className={styles.main}>
          {data.length > 0 ? (
            <div>
              {data.map((user) => (
                <Profile key={user.id} data={user} />
              ))}
            </div>
          ) : (
            <p>データがありません</p>
          )}
        </div>
      )}
    </div>
  );
}
