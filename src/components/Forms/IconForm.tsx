import { useState } from 'react';
import styles from '@/styles/formsModules/IconForm.module.css';

type FormProps = {
  onValueChange: (newValue: File | null) => void;
};

export const IconForm: React.FC<FormProps> = ({ onValueChange }) => {
  const [icon, setIcon] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIcon = e.target.files?.[0] || null;

    // 既に選択されているファイルがあれば上書きする
    if (icon) {
      URL.revokeObjectURL(URL.createObjectURL(icon));
    }

    setIcon(newIcon);
    onValueChange(newIcon);
  };

  return (
    <div className={styles.mainContainer}>
      <form>
        <label>
          <p className={styles.formName}>プロフィールアイコン</p>
          <input type='file' onChange={handleChange} required />
        </label>
      </form>
    </div>
  );
};
