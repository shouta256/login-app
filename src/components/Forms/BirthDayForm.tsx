import { useEffect, useState } from 'react';

type FormProps = {
  onValueChange: (dateKind: string, newValue: number) => void; // 親コンポーネントへのデータのコールバック関数
};

export const BirthDayForm: React.FC<FormProps> = ({ onValueChange }) => {
  const [userBirthYear, setUserBirthYear] = useState(new Date().getFullYear());

  const [userBirthMonth, setUserBirthMonth] = useState(
    new Date().getMonth() + 1
  );
  const [userBirthDay, setUserBirthDay] = useState(new Date().getDate());
  const [dayOptions, setDayOptions] = useState<number[]>([]);

  //optionタグを生成するメソッド
  const createOption = (val: number) => {
    return (
      <option key={val} value={val}>
        {val}
      </option>
    );
  };

  //年や月に対応した末日を計算
  const changeTheDay = () => {
    // 選択された年月の最終日を計算
    const lastDayOfTheMonth = new Date(
      userBirthYear,
      userBirthMonth,
      0
    ).getDate();

    // 選択された年月の日付を生成
    const newDayOptions = Array.from(
      { length: lastDayOfTheMonth },
      (_, index) => index + 1
    );

    // setUserBirthDay(0);
    setDayOptions(newDayOptions);
  };

  const setUserBirthdayYearOptions = () => {
    const yearOptions = Array.from(
      { length: 101 },
      (_, index) => new Date().getFullYear() - 100 + index
    );
    return yearOptions.map(createOption);
  };

  const setUserBirthMonthOptions = () => {
    const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);
    return monthOptions.map(createOption);
  };

  const setUserBirthDayOptions = () => {
    return dayOptions.map(createOption);
  };

  useEffect(() => {
    changeTheDay();
  }, [userBirthYear, userBirthMonth]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setUserBirthYear(parseInt(newValue));
    onValueChange('year', parseInt(newValue));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    setUserBirthMonth(parseInt(newValue));
    onValueChange('month', parseInt(newValue));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setUserBirthDay(parseInt(newValue));
    onValueChange('day', parseInt(newValue));
  };

  return (
    <div>
      <form>
        <label>
          生年月日:
          <select value={userBirthYear} onChange={handleYearChange} required>
            {setUserBirthdayYearOptions()}
          </select>
          年
          <select value={userBirthMonth} onChange={handleMonthChange} required>
            {setUserBirthMonthOptions()}
          </select>
          月
          <select value={userBirthDay} onChange={handleDayChange} required>
            {setUserBirthDayOptions()}
          </select>
          日
        </label>
      </form>
    </div>
  );
};
