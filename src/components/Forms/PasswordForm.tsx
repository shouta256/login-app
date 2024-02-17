import { useState } from 'react';
import styles from '@/styles/formsModules/StringInputForm.module.css';

type FormProps = {
  formType: string;
  onValueChange: (newValue: string, formType: string) => void; // 親コンポーネントへのデータのコールバック関数
};

export const PasswordForm: React.FC<FormProps> = ({
  formType,
  onValueChange,
}) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] =
    useState<string>('password');
  const formName: { [key: string]: string } = {
    password: 'パスワード',
    confirmPassword: 'パスワード（確認用）',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    validate(newValue);
    onValueChange(newValue, formType);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトのフォームサブミットを防止
  };

  const validate = (newValue: string) => {
    if (newValue.length === 0) {
      setError('必須');
    } else {
      setError('');
    }
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ボタンクリックでフォームの送信を防ぐ
    if (isPasswordVisible === 'password') {
      setIsPasswordVisible('text');
    } else if (isPasswordVisible === 'text') {
      setIsPasswordVisible('password');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          <p className={styles.formName}>{formName[formType]}</p>{' '}
          {/* {error.length !== 0 && <span className='text-danger'>{error}</span>} */}
          <br />
          <input
            className={styles.input}
            type={isPasswordVisible}
            value={value}
            onChange={handleChange}
            required
          />
          <button type='button' onClick={handleOnClick}>
            表示
          </button>
        </label>
      </form>
    </div>
  );
};
