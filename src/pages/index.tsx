import { useAuth } from '@/context/auth';
import imageCompression from 'browser-image-compression';
import { loginWithEmailAndPassword, logout, createNewUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export default function Home() {
  const user = useAuth();
  const [waiting, setWaiting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [icon, setIcon] = useState<File | null>(null);

  const db = getFirestore();

  const signIn = () => {
    setWaiting(true);

    loginWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(error?.code);
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  const compressImage = async (icon: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(icon, options);

      // 圧縮された画像データを Base64 に変換
      const base64String = await convertToBase64(compressedFile);

      return base64String;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const signUp = async () => {
    setWaiting(true);

    try {
      // Firebase Authenticationで新しいユーザーを作成
      const userCredential = await createNewUser(email, password);

      // 画像データをBase64にエンコード
      const iconDataUrl = await new Promise((resolve) => {
        if (icon) {
          const reader = new FileReader();
          reader.readAsDataURL(icon);
          reader.onload = () => {
            resolve(reader.result);
          };
        } else {
          resolve(null);
        }
      });

      // 圧縮した画像データを取得
      const compressedIcon = icon ? await compressImage(icon) : null;

      // Firestoreにユーザー情報を保存
      await addDoc(collection(db, 'test'), {
        uid: userCredential.user.uid,
        name: name,
        email: userCredential.user.email,
        icon: compressedIcon, // Base64エンコードした文字列に変換
      });
    } catch (error) {
      console.error(error);
    } finally {
      setWaiting(false);
    }
  };

  const [data, setData] = useState<
    { id: string; name: string; email: string; icon: string }[]
  >([]);
  const getData = async () => {
    try {
      // ログインユーザーのUIDを取得
      const userUID = user?.id || ''; // user?.id が undefined の場合、空文字列をデフォルトとする

      // ログインユーザーのデータを取得するクエリ
      const querySnapshot = await getDocs(
        query(collection(db, 'test'), where('uid', '==', userUID))
      );

      const userArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        icon: doc.data().icon,
      }));

      setData(userArray);
      console.log('取得したデータ', userArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user]); // userが変更されたときにgetDataを呼び出す

  return (
    <div>
      {user === null && !waiting && (
        <form>
          <label>
            ユーザー名:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            メールアドレス:
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            パスワード:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            プロフィールアイコン:
            <input
              type='file'
              onChange={(e) => setIcon(e.target.files?.[0] || null)}
            />
          </label>
          <br />

          <button type='button' onClick={signIn}>
            メールアドレスとパスワードでログイン
          </button>
          <button type='button' onClick={signUp}>
            新規ユーザー作成
          </button>
        </form>
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
