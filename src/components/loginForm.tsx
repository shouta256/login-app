import { loginWithEmailAndPassword } from '@/lib/auth';
import { useState } from 'react';
import { NameOrEmailForm } from './Forms/NameOrEmailForm';
import { PasswordForm } from './Forms/PasswordForm';

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

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
    console.log('emailは', email);
    console.log('passwordは', password);
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
    <div>
      <NameOrEmailForm formType='email' onValueChange={handleValueChange} />
      <PasswordForm formType='password' onValueChange={handleValueChange} />
      {error !== '' && <span>{error}</span>}

      <button type='button' onClick={Login}>
        ログイン
      </button>
    </div>
  );
};
