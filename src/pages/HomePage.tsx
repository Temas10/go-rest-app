import React from 'react';
import { UserTable } from '../components/UserTable';
import { PostTable } from '../components/PostTable';
import { useStore } from '../store/useStore';
import { Text } from '@consta/uikit/Text';
import { useLocation } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { token } = useStore();
  const location = useLocation();
  
  const mode = location.pathname === '/posts' ? 'posts' : 'users';

  if (!token) {
    return <Text view="alert" size="l">Пожалуйста, введите и сохраните Access Token в правом верхнем углу для работы с API.</Text>;
  }

  return (
    <div>
      {mode === 'users' ? <UserTable /> : <PostTable />}
    </div>
  );
};