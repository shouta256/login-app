import { useState } from 'react';

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

  const validate = (newValue: string) => {
    passwordValidation(newValue);
  };

  const passwordValidation = async (newValue: string) => {
    //パスワードポリシー
    const lengthCheck = /^.{6,4096}$/.test(newValue);

    const uppercaseCheck = /[A-Z]/.test(newValue);
    const lowercaseCheck = /[a-z]/.test(newValue);
    const digitCheck = /\d/.test(newValue);
    const isPasswordValid =
      lengthCheck && uppercaseCheck && lowercaseCheck && digitCheck;

    //   const specialCharacterCheck = /[^\w$*.[]{}()?\"!@#%&/\\,><':;|_~`]/.test(newValue);
    if (!isPasswordValid) {
      setError('パスワードが要件を満たしていません');
    } else {
      setError('');
    }
  };
  return (
    <div>
      <form>
        <label>
          <p>{formName[formType]}</p>{' '}
          {error.length !== 0 && <span className='text-danger'>{error}</span>}
          <input
            type={'password'}
            value={value}
            onChange={handleChange}
            required
          />
        </label>
      </form>
    </div>
  );
};
