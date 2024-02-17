import { useEffect, useState } from 'react';
import styles from '@/styles/formsModules/BirthDayFrom.module.css';

type FormProps = {
  onValueChange: (dateKind: string, newValue: number) => void; // 親コンポーネントへのデータのコールバック関数
};

export const BirthDayForm: React.FC<FormProps> = ({ onValueChange }) => {
  const [userBirthYear, setUserBirthYear] = useState(new Date().getFullYear());
  //初期値は現在の日付
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
    // 選択された年月に対応する最終日を計算
    const lastDayOfTheMonth = new Date(
      userBirthYear,
      userBirthMonth,
      0
    ).getDate();

    // 日付の選択肢を生成
    const newDayOptions = Array.from(
      { length: lastDayOfTheMonth },
      (_, index) => index + 1
    );

    setDayOptions(newDayOptions);
  };

  //年の選択肢を生成するメソッド
  const setUserBirthdayYearOptions = () => {
    //現在の年から100年前までを選択肢として計算
    const yearOptions = Array.from(
      { length: 101 },
      (_, index) => new Date().getFullYear() - 100 + index
    );
    return yearOptions.map(createOption);
  };

  //月の選択肢を生成するメソッド
  const setUserBirthMonthOptions = () => {
    const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);
    return monthOptions.map(createOption);
  };

  //日の選択肢を生成するメソッド
  const setUserBirthDayOptions = () => {
    return dayOptions.map(createOption);
  };

  //年か月が選択されたときに日の選択肢を更新
  useEffect(() => {
    changeTheDay();
  }, [userBirthYear, userBirthMonth, changeTheDay]);

  //年が選択されたときに発火するメソッド
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //選択された年を保存
    const newValue = e.target.value;
    setUserBirthYear(parseInt(newValue));
    onValueChange('year', parseInt(newValue));
  };

  //月が選択されたときに発火するメソッド
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //選択された月を保存
    const newValue = e.target.value;
    setUserBirthMonth(parseInt(newValue));
    onValueChange('month', parseInt(newValue));
  };

  //日が選択されたときに発火するメソッド
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //選択された日を保存
    const newValue = e.target.value;
    setUserBirthDay(parseInt(newValue));
    onValueChange('day', parseInt(newValue));
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form}>
        <p className={styles.formName}>生年月日</p>
        <select
          className={styles.select}
          value={userBirthYear}
          onChange={handleYearChange}
          required
        >
          {setUserBirthdayYearOptions()}
        </select>
        年
        <select
          className={styles.select}
          value={userBirthMonth}
          onChange={handleMonthChange}
          required
        >
          {setUserBirthMonthOptions()}
        </select>
        月
        <select
          className={styles.select}
          value={userBirthDay}
          onChange={handleDayChange}
          required
        >
          {setUserBirthDayOptions()}
        </select>
        日
      </form>
    </div>
  );
};
