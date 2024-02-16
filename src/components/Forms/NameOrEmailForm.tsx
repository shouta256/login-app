import { useState } from 'react';

type FormProps = {
  formType: string;
  onValueChange: (newValue: string, formType: string) => void; // 親コンポーネントへのデータのコールバック関数
};

export const NameOrEmailForm: React.FC<FormProps> = ({
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

  const validate = (newValue: string) => {
    switch (formType) {
      case 'name':
        nameValidation(newValue);
        break;
      case 'email':
        emailValidation(newValue);
        break;
      case 'password' || 'confirmPassword':
        passwordValidation(newValue);
      default:
        break;
    }
  };

  const nameValidation = (newValue: string) => {
    if (newValue.length === 0) {
      setError('必須項目です');
    }
  };

  const emailValidation = async (newValue: string) => {
    if (newValue.length === 0) {
      setError('必須項目です');
    }
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
