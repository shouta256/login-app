import { useAuth } from '@/context/auth';
import { logout } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LoginForm } from '@/components/loginForm';
import { SignUpForm } from '@/components/SignUpForm';

export default function Home() {
  const user = useAuth();
  const [waiting, setWaiting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [icon, setIcon] = useState<File | null>(null);

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
        const userUID = user?.id || ''; // user?.id が undefined の場合、空文字列をデフォルトとする

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
        console.log('取得したデータ', userArray);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [user]); // userが変更されたときにgetDataを呼び出す

  return (
    <div>
      {user === null && !waiting && (
        <div>
          <h2>ログイン</h2>
          <LoginForm />
          <h2>新規登録</h2>
          <SignUpForm />
        </div>
      )}
      {user && <button onClick={logout}>ログアウト</button>}
      {user && (
        <div>
          <h2>ログインユーザーのデータ</h2>
          {data.length > 0 ? (
            <ul>
              {data.map((user) => (
                <li key={user.id}>
                  <p>ユーザー名: {user.name}</p>
                  <p>メールアドレス: {user.email}</p>
                  <p>
                    アイコン:{' '}
                    {user.icon && <img src={user.icon} alt='user-icon' />}
                  </p>
                  <p>生年月日: {user.birthDay}</p>
                  <p>性別: {user.sex}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>データがありません</p>
          )}
        </div>
      )}
    </div>
  );
}
