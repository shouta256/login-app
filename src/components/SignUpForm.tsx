import { createNewUser } from '@/lib/auth';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { compressAndEncodeToBase64 } from '@/lib/convertImage';
import { StringInputForm } from '@/components/Forms/StringInputForm';
import { BirthDayForm } from './Forms/BirthDayForm';
import { IconForm } from './Forms/IconForm';
import { SexForm } from './Forms/SexForm';
import { TermsOfUserForm } from './Forms/TermsOfUseForm';
import { PasswordForm } from './Forms/PasswordForm';
import styles from '@/styles/SignUpForm.module.css';

export const SignUpForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [icon, setIcon] = useState<File | null>(null);
  const [userBirthYear, setUserBirthYear] = useState(new Date().getFullYear());
  const [userBirthMonth, setUserBirthMonth] = useState(
    new Date().getMonth() + 1
  );
  const [userBirthDay, setUserBirthDay] = useState(new Date().getDate());
  let userBirthDate: string;
  const [sex, setSex] = useState<string>('男性');
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleValueChange = (value: string, formType: string) => {
    switch (formType) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleBirthChange = (dateKind: string, value: number) => {
    switch (dateKind) {
      case 'year':
        setUserBirthYear(value);
        break;
      case 'month':
        setUserBirthMonth(value);
        break;
      case 'day':
        setUserBirthDay(value);
        break;
      default:
        break;
    }
  };

  const handleIconChange = (value: File | null) => {
    setIcon(value);
  };

  const handleSexChange = (value: string) => {
    setSex(value);
  };

  const handleIsAgreeChange = (value: boolean) => {
    setIsAgree(value);
  };

  const signUp = async () => {
    userBirthDate =
      userBirthYear + '年' + userBirthMonth + '月' + userBirthDay + '日';
    console.log('nameは', name);
    console.log('emailは', email);
    console.log('passwordは', password);
    console.log('fileは', icon);
    console.log('生年月日は', userBirthDate);
    console.log('sexは', sex);
    console.log('isAgreeは', isAgree);

    if (name !== '' && email !== '' && icon !== null) {
      if (password === confirmPassword) {
        try {
          // Firebase Authenticationで新しいユーザーを作成
          const userCredential = await createNewUser(email, password);
          const convertedIcon = await compressAndEncodeToBase64(icon!); //icon画像を圧縮しBase64に変換

          // Firestoreにユーザー情報を保存
          await addDoc(collection(db, 'newTest'), {
            uid: userCredential.user.uid,
            name: name,
            email: userCredential.user.email,
            icon: convertedIcon,
            birthDay: userBirthDate,
            sex: sex,
          });
        } catch (error: any) {
          console.error(error.code);
          switch (error.code) {
            case 'auth/email-already-in-use':
              setEmailError('このメールアドレスは既に使用されています');
              break;
            case 'auth/invalid-email':
              setEmailError('メールアドレスの形式が正しくありません');
              break;
            case 'auth/weak-password':
              setPasswordError(
                '大文字、小文字、数字、英数字以外の文字を使用してください'
              );
              break;
            default:
              setGeneralError(
                '認証に失敗しました。しばらく時間をおいて再度お試しください'
              );
              break;
          }
        }
      } else {
        setPasswordError('パスワードが一致していません');
      }
    } else {
      console.log('入力していない項目があります');
      setGeneralError('入力していない項目があります');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>サインアップ</h2>
      <StringInputForm formType='name' onValueChange={handleValueChange} />
      {emailError !== '' && <span>{emailError}</span>}

      <StringInputForm formType='email' onValueChange={handleValueChange} />

      {passwordError !== '' && <span>{passwordError}</span>}
      <PasswordForm formType='password' onValueChange={handleValueChange} />
      <PasswordForm
        formType='confirmPassword'
        onValueChange={handleValueChange}
      />
      <IconForm onValueChange={handleIconChange} />
      <BirthDayForm onValueChange={handleBirthChange} />
      <SexForm onValueChange={handleSexChange} />
      <TermsOfUserForm onValueChange={handleIsAgreeChange} />

      {generalError !== '' && <span>{generalError}</span>}

      <button className={styles.signUpButton} type='button' onClick={signUp}>
        サインアップ
      </button>
    </div>
  );
};
