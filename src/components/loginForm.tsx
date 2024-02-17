import { loginWithEmailAndPassword } from '@/lib/auth';
import { useState } from 'react';
import { StringInputForm } from './Forms/StringInputForm';
import { PasswordForm } from './Forms/PasswordForm';
import styles from '@/styles/LoginForm.module.css';

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  //入力された値を変数に格納するメソッド
  const handleValueChange = (value: string, formType: string) => {
    switch (formType) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const Login = () => {
    //firebaseのエラーをキャッチする
    loginWithEmailAndPassword(email, password).catch((e: any) => {
      switch (e.code) {
        case 'auth/missing-email':
          setError('メールアドレスを入力してください');
          break;
        case 'auth/invalid-email':
          setError('メールアドレスが正しくありません');
          break;
        case 'auth/invalid-credential':
          setError('メールアドレスまたはパスワードが違います');
          break;
        default:
          setError('ログインに失敗しました');
      }
    });
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>ログイン</h2>
      <StringInputForm formType='email' onValueChange={handleValueChange} />
      <PasswordForm formType='password' onValueChange={handleValueChange} />
      {error !== '' && <span className={styles.error}>{error}</span>}

      <button className={styles.loginButton} type='button' onClick={Login}>
        ログイン
      </button>
    </div>
  );
};
