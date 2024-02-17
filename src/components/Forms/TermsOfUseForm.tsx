import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/formsModules/TermsOfUserForm.module.css';

type FormProps = {
  onValueChange: (newValue: boolean) => void;
};

export const TermsOfUserForm: React.FC<FormProps> = ({ onValueChange }) => {
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsAgree(newValue);
    onValueChange(newValue);
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form}>
        <input
          className={styles.input}
          type='checkbox'
          checked={isAgree}
          onChange={handleChange}
          required
        />
        <div className={styles.text}>
          <Link
            className={styles.link}
            href='https://menherasenpai.notion.site/457df49475494671807673a0a3346451'
          >
            利用規約
          </Link>
          に同意する
        </div>
      </form>
    </div>
  );
};
