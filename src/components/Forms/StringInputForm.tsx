import { useState } from 'react';
import style from '@/styles/formsModules/StringInputForm.module.css';

type FormProps = {
  formType: string;
  onValueChange: (newValue: string, formType: string) => void; // 親コンポーネントへのデータのコールバック関数
};

export const StringInputForm: React.FC<FormProps> = ({
  formType,
  onValueChange,
}) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const formName: { [key: string]: string } = {
    name: 'ユーザー名',
    email: 'メールアドレス',
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

  return (
    <div className={style.mainContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          <p className={style.formName}>{formName[formType]}</p>
          {error.length !== 0 && <span className={style.error}>{error}</span>}
          <br />
          <input
            className={style.input}
            type={formType}
            value={value}
            onChange={handleChange}
            required
          />
        </label>
      </form>
    </div>
  );
};
