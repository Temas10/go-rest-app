import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import api from '../api';

type User = { id: number; name: string; email: string; gender: string; status: string };

export const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) api.get(`/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <Text>Загрузка...</Text>;

  const nameParts = user.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div>
      <Button label="Назад к списку" onClick={() => navigate(-1)} style={{ marginBottom: '16px' }} />
      <Card verticalSpace="xl" horizontalSpace="xl" style={{ maxWidth: '600px' }}>
        <Text size="3xl" weight="bold">{user.name}</Text>
        <div style={{ marginTop: '16px' }}>
          <Text>Имя: {firstName}</Text>
          <Text>Фамилия: {lastName || '—'}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Пол: {user.gender}</Text>
          <Text>Статус: {user.status}</Text>
        </div>
      </Card>
    </div>
  );
};