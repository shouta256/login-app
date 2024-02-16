import { useState } from 'react';

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
    <div>
      <form>
        <label>
          性別:
          <select value={sex} onChange={handleChange} required>
            <option value='man'>男性</option>
            <option value='woman'>女性</option>
            <option value='other'>その他</option>
            <option value='noAnswer'>答えない</option>
          </select>
        </label>
      </form>
    </div>
  );
};
