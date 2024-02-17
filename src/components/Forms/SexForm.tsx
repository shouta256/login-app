import { useState } from 'react';
import styles from '@/styles/formsModules/SexForm.module.css';

type FormProps = {
  onValueChange: (newValue: string) => void;
};

export const SexForm: React.FC<FormProps> = ({ onValueChange }) => {
  const [sex, setSex] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSex(newValue);
    onValueChange(newValue);
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form}>
        <p className={styles.formName}>性別:</p>
        <select
          className={styles.select}
          value={sex}
          onChange={handleChange}
          required
        >
          <option value='男性'>男性</option>
          <option value='女性'>女性</option>
          <option value='その他'>その他</option>
          <option value='答えない'>答えない</option>
        </select>
      </form>
    </div>
  );
};
