import React from 'react';
import { logout } from '@/lib/auth';
import styles from '@/styles/Profile.module.css';

type PropsType = {
  data: {
    id: string;
    name: string;
    email: string;
    icon: string;
    birthDay: string;
    sex: string;
  };
};

export const Profile = ({ data }: PropsType) => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>{data.name}さんのプロフィール</h1>
      <div className={styles.flexContainer}>
        {data.icon && (
          <img className={styles.icon} src={data.icon} alt='user-icon' />
        )}
        <div className={styles.userData}>
          <p>ユーザー名: {data.name}</p>

          <p>メールアドレス: {data.email}</p>
          <p>誕生日:{data.birthDay}</p>
          <p>性別:{data.sex}</p>
        </div>
      </div>
      <button className={styles.logoutButton} onClick={logout}>
        ログアウト
      </button>
    </div>
  );
};
