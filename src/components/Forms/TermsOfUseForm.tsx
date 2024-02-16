import Link from 'next/link';
import { useState } from 'react';

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
    <div>
      <form>
        <label>
          利用規約に同意する
          <Link href='https://menherasenpai.notion.site/457df49475494671807673a0a3346451'>
            利用規約はこちら
          </Link>
          <input
            type='radio'
            checked={isAgree}
            onChange={handleChange}
            required
          />
        </label>
      </form>
    </div>
  );
};
